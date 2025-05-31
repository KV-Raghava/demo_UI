import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination, 
  TableSortLabel,
  Paper, 
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button
} from '@mui/material';

// We're using MUI icons for search and other actions
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

// Download icon component
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

// Function to get style based on node type for consistent color coding across views
const getNodeTypeStyle = (type) => {
  // Match exact colors from screenshot
  const colorMap = {
    'Farmer': '#4CAF50',       // Green
    'Farmer_Group': '#2196F3', // Blue 
    'Local_Buying_Agent': '#FFA500', // Orange
    'Lot': '#9C27B0',          // Purple
    'Purchase_Order': '#F44336', // Red
    'PMB': '#795548',          // Brown
    'Process_Order': '#FF5722', // Deep Orange
    'Transfer_Order': '#009688', // Teal
    'Destination': '#607D8B'   // Blue Grey
  };

  return {
    backgroundColor: colorMap[type] || '#607D8B',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'inline-block'
  };
};

// Utility function to format date strings
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
};

// Nicely format attribute names
const formatAttributeName = (name) => {
  if (!name) return '';
  // Remove @ prefix if exists
  const cleanName = name.startsWith('@') ? name.substring(1) : name;
  
  // Split by underscore or camelCase
  return cleanName.split(/(?=[A-Z])|_/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

const TableView = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  // Process data to flatten nodes for table display
  const tableData = useMemo(() => {
    if (!data || !data[0] || !data[0].node) return [];

    return data[0].node.map(node => {
      // Basic node info
      const baseInfo = {
        v_id: node.v_id,
        v_type: node.v_type,
      };

      // Add all attributes as top-level properties
      const attributes = node.attributes || {};
      
      // Return combined object
      return { ...baseInfo, ...attributes };
    });
  }, [data]);

  // Get common headers across all nodes
  const headers = useMemo(() => {
    if (!tableData.length) return [];
    
    // These fields will always be included regardless of frequency
    const essentialFields = ['v_id', 'v_type', 'name'];
    
    // Fields to explicitly exclude - make case insensitive pattern matches
    const excludePatterns = [
      /polygon/i, 
      /^id$/i, 
      /country/i,
      /destination/i,
      /^dest/i
    ];
    
    // Count frequency of each field across all nodes
    const fieldFrequency = {};
    tableData.forEach(row => {
      Object.keys(row).forEach(key => {
        // Skip excluded fields using pattern matching
        if (!excludePatterns.some(pattern => pattern.test(key))) {
          fieldFrequency[key] = (fieldFrequency[key] || 0) + 1;
        }
      });
    });
    
    // Define threshold for "common" (50% of nodes have this field)
    const commonThreshold = tableData.length * 0.5;
    
    // Get fields that appear in at least 50% of nodes
    const commonFields = Object.keys(fieldFrequency)
      .filter(field => fieldFrequency[field] >= commonThreshold || essentialFields.includes(field));
    
    // Sort fields to put essential ones first, then by frequency
    return [
      ...essentialFields.filter(field => commonFields.includes(field)),
      ...commonFields
        .filter(field => !essentialFields.includes(field))
        .sort((a, b) => fieldFrequency[b] - fieldFrequency[a])
    ];
  }, [tableData]);

  // Apply sorting
  const sortedData = useMemo(() => {
    // Make a copy of the data
    const dataToSort = [...tableData];
    
    // Sort the data
    return dataToSort.sort((a, b) => {
      const valueA = a[orderBy] === undefined ? '' : a[orderBy];
      const valueB = b[orderBy] === undefined ? '' : b[orderBy];
      
      // For string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' 
          ? valueA.localeCompare(valueA)
          : valueB.localeCompare(valueB);
      }
      
      // For number comparison
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }, [tableData, order, orderBy]);

  // Apply search filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return sortedData.filter(row => {
      return Object.entries(row).some(([key, value]) => {
        // Skip filtering arrays and objects
        if (Array.isArray(value) || value === null || value === undefined || typeof value === 'object') {
          return false;
        }
        
        // Convert values to string for comparison
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(lowerCaseSearchTerm);
      });
    });
  }, [sortedData, searchTerm]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Function to handle CSV download
  const handleDownload = () => {
    // Create CSV content
    const headerRow = headers.map(header => `"${formatAttributeName(header)}"`).join(',');
    
    const rows = filteredData.map(row => {
      return headers.map(column => {
        let value = row[column];
        
        // Format special values for CSV
        if (value === undefined || value === null) {
          return '""';
        } else if (typeof value === 'boolean') {
          return value ? '"Yes"' : '"No"';
        } else if (Array.isArray(value)) {
          return `"${value.join(', ')}"`;
        } else if (column === 'v_type') {
          return `"${value.replace(/_/g, ' ')}"`;
        } else if (column.toLowerCase().includes('date') && value) {
          try {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              value = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
              });
            }
          } catch (e) {
            // Keep original value if date parsing fails
          }
          return `"${value}"`;
        }
        
        // Escape quotes in strings
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
        }
        
        return `"${value}"`;
      }).join(',');
    }).join('\n');
    
    // Combine header and rows
    const csv = `${headerRow}\n${rows}`;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'traceability_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render cell content based on data type
  const renderCellContent = (row, column) => {
    let value = row[column];
    
    // Special handling for name field - check different name fields based on node type
    if (column === 'name' && (value === undefined || value === null)) {
      // Try to find an appropriate name field based on node type
      const nodeType = row['v_type'];
      const nameFields = [
        'farmer_name', 
        'buying_agent_name',
        'farmer_group_name', 
        'process_name',
        'material_name',
        'batch_name', 
        'description'
      ];
      
      // Find the first non-empty name field
      for (const field of nameFields) {
        if (row[field] !== undefined && row[field] !== null) {
          value = row[field];
          break;
        }
      }
    }
    
    if (value === undefined || value === null) {
      return '-';
    }
    
    // Special case for node type - show with color
    if (column === 'v_type') {
      return <span style={getNodeTypeStyle(value)}>{value.replace(/_/g, ' ')}</span>;
    }
    
    // Format dates
    if (column.toLowerCase().includes('date')) {
      return formatDate(value);
    }
    
    // Format booleans
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }
    
    // Format arrays
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    // Return as string for all other types
    return String(value);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search toolbar */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Traceability Data
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search data..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: '300px' }}
          />
          <Button
            variant="outlined"  // Changed from "contained" to "outlined" for more subtle appearance
            color="secondary"   // Changed from "primary" to "secondary" to match existing color scheme
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            size="small"
            sx={{
              borderColor: '#2196F3',  // Match the blue color used elsewhere
              color: '#2196F3',        // Text color to match
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.04)',
                borderColor: '#1976D2',
              }
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
      
      {/* Table component */}
      <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table stickyHeader aria-label="traceability data table">
          <TableHead>
            <TableRow>
              {headers.map((column) => (
                <TableCell 
                  key={column}
                  sortDirection={orderBy === column ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleRequestSort(column)}
                  >
                    {formatAttributeName(column)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover key={row.v_id || rowIndex}>
                  {headers.map((column) => (
                    <TableCell key={`${row.v_id}-${column}`}>
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={headers.length} align="center" sx={{ py: 3 }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TableView;