import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';
import '../styles/GraphStyles.css';

// Log for debugging
console.log("GraphVisualization component loaded");

const GraphVisualization = ({ data }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 65 // Adjust for header
  });
  const fgRef = useRef();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 65
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track if node was dragged to fix its position
  const [draggedNodes, setDraggedNodes] = useState(new Set());

  // Function to generate more user-friendly display names
  const getDisplayName = (node) => {
    const { v_type, v_id, attributes } = node;
    
    switch (v_type) {
      case 'Farmer':
        return attributes.farmer_name || `Farmer ${v_id.split('-').pop()}`;
      
      case 'Farmer_Group':
        return attributes.farmer_group_name || `Farmer Group ${v_id.split('-').pop()}`;
      
      case 'Local_Buying_Agent':
        return attributes.buying_agent_name || `Agent ${v_id.split('-').pop()}`;
      
      case 'Lot':
        // Format: "Lot #[ID] - [Product] [Grade]"
        return `Lot #${v_id.split('-').pop()} - ${attributes.product || ''} ${attributes.grade || ''}`.trim();
      
      case 'PMB':
        // Format: "Material: [material] - Batch: [batch_no]"
        return `Material: ${attributes.material || 'N/A'} - Batch: ${attributes.batch_no || 'N/A'}`;
      
      case 'Process_Order':
        // Format: "Process: [process_name]"
        return attributes.process_name || `Process ${v_id.split('-').pop()}`;
      
      case 'Purchase_Order':
        // Format: "PO #[ID] - [vendor_name]"
        return `PO #${v_id.split('-').pop()} - ${attributes.vendor_name || ''}`.trim();
      
      case 'Transfer_Order':
        // Format: "Transfer: [from_plant] → [to_plant]"
        return `Transfer: ${attributes.from_plant || 'N/A'} → ${attributes.to_plant || 'N/A'}`;
      
      default:
        return attributes.name || v_id;
    }
  };
  
  // Function to check if a node has EUDR compliance field and return its status
  const getEudrComplianceStatus = (node) => {
    if (node.attributes && 'is_eudr_compliant' in node.attributes) {
      return node.attributes.is_eudr_compliant;
    }
    return null; // null means no compliance field present
  };

  // Function to generate appropriate short labels
  const getShortLabel = (node) => {
    const { v_type } = node;
    
    // Return full names instead of abbreviations
    switch (v_type) {
      case 'Farmer':
        return 'Farmer';
      case 'Farmer_Group':
        return 'Farmer Group';
      case 'Local_Buying_Agent':
        return 'Buying Agent';
      case 'Lot':
        return 'Lot';
      case 'Purchase_Order':
        return 'Purchase Order';
      case 'PMB':
        return 'Plant Material Batch';
      case 'Process_Order':
        return 'Process Order';
      case 'Transfer_Order':
        return 'Transfer Order';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    console.log("GraphVisualization received data:", data);
    if (!data || !data.length) {
      console.log("No data received or data is not an array");
      return;
    }
    console.log("Data structure type:", typeof data, Array.isArray(data));
    
    const nodes = [];
    let links = [];
    
    // Check which data structure we have
    if (data[0].node && Array.isArray(data[0].node)) {
      // New data structure with node array
      data[0].node.forEach(node => {
        // Process nodes
        const shortLabel = getShortLabel(node);
        const displayName = getDisplayName(node);
        
        nodes.push({
          id: node.v_id,
          name: displayName,
          shortLabel: shortLabel,
          type: node.v_type,
          attributes: node.attributes,
          color: getNodeColor(node.v_type)
        });
      });
      
      // Process edges from new structure and filter out links with non-existent nodes
      if (data[0].edges && Array.isArray(data[0].edges)) {
        // Create a set of valid node IDs for quick lookup
        const nodeIds = new Set(nodes.map(node => node.id));

        // Create a map for edge type colors
        const edgeTypeColors = {
          'Has': '#4CAF50', // Green
          'Has_Farmer_Group': '#2196F3', // Blue
          'Has_Process_Order': '#FF5722', // Deep Orange
          'Has_Order': '#F44336', // Red
          'Has_Buying_Agent': '#9C27B0', // Purple
          'Contains_Lot': '#795548', // Brown
          'Transfer': '#009688' // Teal
        };

        // Only include edges where both source and target nodes exist
        links = data[0].edges
          .filter(edge => nodeIds.has(edge.from_id) && nodeIds.has(edge.to_id))
          .map(edge => ({
            source: edge.from_id,
            target: edge.to_id,
            type: edge.e_type,
            color: edgeTypeColors[edge.e_type] || '#999',
            directed: true
          }));
      }
    } else {
      // Original data structure with separate node categories
      const nodeCategories = Object.keys(data[0]);
      
      nodeCategories.forEach(category => {
        data[0][category].forEach(node => {
          const shortLabel = getShortLabel(node);
          const displayName = getDisplayName(node);
          
          nodes.push({
            id: node.v_id,
            name: displayName,
            shortLabel: shortLabel,
            type: node.v_type,
            category,
            attributes: node.attributes,
            color: getNodeColor(node.v_type)
          });
        });
      });
      
      // Process edges from the second object and filter out links with non-existent nodes
      if (data[1] && data[1].edges) {
        // Create a set of valid node IDs for quick lookup
        const nodeIds = new Set(nodes.map(node => node.id));

        // Create a map for edge type colors
        const edgeTypeColors = {
          'Has': '#4CAF50', // Green
          'Has_Farmer_Group': '#2196F3', // Blue
          'Has_Process_Order': '#FF5722', // Deep Orange
          'Has_Order': '#F44336', // Red
          'Has_Buying_Agent': '#9C27B0', // Purple
          'Contains_Lot': '#795548', // Brown
          'Transfer': '#009688' // Teal
        };

        // Only include edges where both source and target nodes exist
        links = data[1].edges
          .filter(edge => nodeIds.has(edge.from_id) && nodeIds.has(edge.to_id))
          .map(edge => ({
            source: edge.from_id,
            target: edge.to_id,
            type: edge.e_type,
            color: edgeTypeColors[edge.e_type] || '#999',
            directed: true
          }));
      }
    }
    
    const processedData = { nodes, links };
    console.log("Processed graph data:", processedData);
    setGraphData(processedData);
  }, [data]);

  useEffect(() => {
    console.log("Second useEffect - Graph data:", graphData, "fgRef exists:", !!fgRef.current);
    if (fgRef.current && graphData.nodes.length > 0) {
      console.log("Setting up force graph with", graphData.nodes.length, "nodes and", graphData.links.length, "links");
      // Define the order of node types from left to right
      const nodeTypeOrder = [
        'Farmer',
        'Farmer_Group',
        'Local_Buying_Agent',
        'Lot',
        'Purchase_Order',
        'PMB',
        'Process_Order',
        'Transfer_Order'
      ];
      
      // Calculate X positions based on node type order (strict columns)
      const totalWidth = dimensions.width * 0.92; // Increased from 0.85 to use more screen width
      const xStep = totalWidth / (nodeTypeOrder.length - 1) * 1.1; // Increased horizontal spacing by 10%
      const xOffset = -totalWidth / 2; // Center the line
      
      // For a straight line layout, reduce or remove most forces
      
      // Very weak charge force - just enough to prevent complete overlap
      fgRef.current.d3Force('charge').strength(-50);
      
      // Use longer distance for links with low strength
      fgRef.current.d3Force('link')
        .distance(xStep)  // Match the column spacing
        .strength(0.05);  // Very weak link influence
      
      // No center force for a straight line
      fgRef.current.d3Force('center', null);
      
      // Increased collision detection radius to prevent overlap with larger nodes
      fgRef.current.d3Force('collision', d3.forceCollide(55)); // Increased from 30 to 55
      
      // Remove any gravity force
      
      // Clear any initial velocities for a controlled straight line layout
      graphData.nodes.forEach(node => {
        // Reset velocities
        node.vx = 0;
        node.vy = 0;
      });
      
      // Set exact X positions for nodes
      graphData.nodes.forEach(node => {
        if (node.fx === undefined) { // Don't override manually positioned nodes
          const typeIndex = nodeTypeOrder.indexOf(node.type);
          if (typeIndex >= 0) {
            // Fixed X position for each node type
            node.fx = xOffset + (typeIndex * xStep);
            
            // For Y position, use a small random offset for nodes of the same type
            // to prevent perfect overlap
            const nodeTypeNodes = graphData.nodes.filter(n => n.type === node.type);
            const indexInType = nodeTypeNodes.indexOf(node);
            const totalOfType = nodeTypeNodes.length;
            
            if (totalOfType > 1) {
              // Create a vertical distribution for nodes of the same type
              const yRange = 500; // Increased from 300 for more vertical spacing
              const yStep = yRange / (totalOfType - 1 || 1);
              const yCenter = 0; // Center Y position
              
              // Position nodes vertically, centered around yCenter
              const yPos = yCenter - (yRange / 2) + (indexInType * yStep);
              node.fy = yPos;
            } else {
              // If only one node of this type, put it in the center
              node.fy = 0;
            }
          }
        }
      });
      
      // Set much stronger positioning forces to maintain the line
      fgRef.current.d3Force('x', d3.forceX(node => node.fx || 0).strength(0.8));
      fgRef.current.d3Force('y', d3.forceY(node => node.fy || 0).strength(0.8));

      // For straight line layout, set zoom directly instead of auto-fitting
      setTimeout(() => {
        // Calculate zoom level based on window width to ensure the entire line is visible
        // Use the same totalWidth that was calculated above
        const idealZoom = (dimensions.width / (totalWidth + 200)) * 0.85;
        
        // Center the view at 0,0
        fgRef.current.centerAt(0, 0, 800);
        
        // Apply custom zoom level
        fgRef.current.zoom(idealZoom, 800);
      }, 500);
    }
  }, [graphData]);

  const getNodeColor = (type) => {
    // Match exact colors from screenshot
    const colorMap = {
      'Farmer': '#4CAF50',       // Green
      'Farmer_Group': '#2196F3', // Blue 
      'Local_Buying_Agent': '#FFA500', // Orange
      'Lot': '#9C27B0',          // Purple
      'Purchase_Order': '#F44336', // Red
      'PMB': '#795548',          // Brown
      'Process_Order': '#FF5722', // Deep Orange
      'Transfer_Order': '#009688' // Teal
    };
    
    return colorMap[type] || '#607D8B';
  };

  const handleNodeClick = (node) => {
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2, 1000);
    }
    setSelectedNode(node);
  };
  
  // Handle double-click to release a node's fixed position
  const handleNodeDoubleClick = (node) => {
    // Remove fixed positioning
    node.fx = undefined;
    node.fy = undefined;
    
    // Update dragged nodes set
    setDraggedNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(node.id);
      return newSet;
    });
  };

  const renderNodeTooltip = () => {
    if (!selectedNode) return null;
    
    // Check if this is a farmer node with polygon data
    const isFarmer = selectedNode.type === 'Farmer';
    const hasPolygon = isFarmer && selectedNode.attributes.polygon;
    
    // Helper function to convert to sentence case (first letter capital, rest lowercase)
    const toSentenceCase = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    
    // Helper function to format type field with sentence case for each word
    const formatTypeDisplay = (type) => {
      return type.split('_')
        .map(word => toSentenceCase(word))
        .join(' ');
    };
    
    return (
      <div className="node-tooltip">
        <h3>{selectedNode.name}</h3>
        <p><strong>Type:</strong> {formatTypeDisplay(selectedNode.type)}</p>
        <p><strong>ID:</strong> {selectedNode.id}</p>
        <div className="attributes">
          {Object.entries(selectedNode.attributes)
            .filter(([key]) => {
              // Filter out special attributes, id (already shown), and polygon (will be handled separately)
              return !key.startsWith('@') && key !== 'id' && key !== 'polygon';
            })
            .map(([key, value]) => {
              // Format the key as sentence case
              const formattedKey = key.split('_')
                .map(word => toSentenceCase(word))
                .join(' ');
              
              // Format the value as sentence case if it's a string (except for IDs and specific values)
              let formattedValue = value;
              if (typeof value === 'string' && 
                  !key.toLowerCase().includes('id') && 
                  !key.toLowerCase().includes('date') &&
                  !key.toLowerCase().includes('time')) {
                formattedValue = toSentenceCase(value);
              }
              
              return (
                <div key={key} className="attribute-row">
                  <span className="attribute-key">{formattedKey}:</span>
                  <span className="attribute-value">
                    {typeof value === 'boolean' 
                      ? value ? '✓' : '✗'
                      : String(formattedValue)}
                  </span>
                </div>
              );
            })}
        </div>
        
        {/* Add View Map button for farmers with polygon data */}
        {hasPolygon && (
          <div className="view-map-button-container">
            <button 
              className="view-map-button"
              onClick={() => {
                // Create a modal to display the map
                const modalDiv = document.createElement('div');
                modalDiv.className = 'map-modal';
                
                // Close button
                const closeButton = document.createElement('button');
                closeButton.className = 'map-modal-close';
                closeButton.innerHTML = '×';
                closeButton.onclick = () => document.body.removeChild(modalDiv);
                
                // Title
                const titleDiv = document.createElement('div');
                titleDiv.className = 'map-modal-title';
                titleDiv.textContent = `${selectedNode.name}'s Farm Map`;
                
                // Map container
                const mapContainer = document.createElement('div');
                mapContainer.className = 'map-modal-content';
                
                modalDiv.appendChild(closeButton);
                modalDiv.appendChild(titleDiv);
                modalDiv.appendChild(mapContainer);
                document.body.appendChild(modalDiv);
                
                // Import and initialize FarmMap component dynamically
                import('./FarmMap').then(module => {
                  const FarmMap = module.default;
                  const farmer = {
                    v_id: selectedNode.id,
                    v_type: 'Farmer',
                    attributes: selectedNode.attributes
                  };
                  
                  // Create a minimal dataset with just this farmer
                  const singleFarmerData = [
                    { 
                      v_farmer: [farmer]
                    }
                  ];
                  
                  // Render with React
                  ReactDOM.render(
                    React.createElement(FarmMap, { data: singleFarmerData }),
                    mapContainer
                  );
                });
              }}
            >
              View Map
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="graph-container">
      {/* 
      <div className="legend">
        <div className="legend-section" style={{marginBottom: '10px'}}>
          <div style={{fontSize: '12px', marginBottom: '5px', fontStyle: 'italic', color: '#666'}}>
            Nodes are in columns by type, from left to right.
            <br />
            You can drag nodes to adjust position. Right-click to reset.
          </div>
        </div>
        <div className="legend-section">
          <h4>Node Types</h4>
          {['Farmer', 'Farmer_Group', 'Local_Buying_Agent', 'Lot', 'Purchase_Order', 'PMB', 'Process_Order', 'Transfer_Order'].map(type => (
            <div key={type} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: getNodeColor(type) }}></span>
              <span className="legend-label">{type.replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
        <div className="legend-section">
          <h4>Edge Types</h4>
          {['Has', 'Has_Farmer_Group', 'Has_Process_Order', 'Has_Order', 'Has_Buying_Agent', 'Contains_Lot', 'Transfer'].map(type => (
            <div key={type} className="legend-item">
              <span className="legend-line" style={{ backgroundColor:
                type === 'Has' ? '#4CAF50' :
                type === 'Has_Farmer_Group' ? '#2196F3' :
                type === 'Has_Process_Order' ? '#FF5722' :
                type === 'Has_Order' ? '#F44336' :
                type === 'Has_Buying_Agent' ? '#9C27B0' :
                type === 'Contains_Lot' ? '#795548' :
                type === 'Transfer' ? '#009688' : '#999'
              }}></span>
              <span className="legend-label">{type.replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
      </div>
      */}
      
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width} // Use dynamic width
        height={dimensions.height} // Use dynamic height
        nodeRelSize={20} // Increased to match the larger node radius
        nodeLabel={null} // We'll handle this in nodeCanvasObject
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        minZoom={0.5}
        maxZoom={5}
        linkDirectionalArrowLength={8} // Larger arrow to match node size
        linkDirectionalArrowRelPos={1} // At the end of the link
        linkDirectionalArrowColor={(link) => link.color || '#555'} // Match link color
        linkWidth={2} // Slightly thinner for cleaner look in straight layout
        linkLineDash={[]} // No dash pattern
        linkDirectionalParticles={0} // No particles
        linkColor={(link) => {
          // Use lighter link colors for better visibility against the structured layout
          const baseColor = link.color || '#555';
          // Convert hex to rgba with some transparency
          return baseColor.startsWith('#') 
            ? `${baseColor}CC` // Add 80% opacity if it's a hex color
            : baseColor;
        }}
        cooldownTicks={200}
        cooldownTime={10000}
        d3AlphaDecay={0.01} // Slower decay for more gradual settling
        d3VelocityDecay={0.08} // Even lower velocity decay for more horizontal movement
        d3AlphaMin={0.001} // Ensure simulation runs longer for better layout
        linkCurvature={0} // Set to 0 for straight lines
        onNodeClick={handleNodeClick}
        onNodeRightClick={handleNodeDoubleClick} // Use right-click as alternative to double-click
        onNodeHover={(node) => {
          document.body.style.cursor = node ? 'pointer' : 'default';
          setSelectedNode(node || null);
        }}
        onNodeDragStart={(node) => {
          // When node drag starts, add it to the fixed nodes
          node.fx = node.x;
          node.fy = node.y;
          setDraggedNodes(prev => {
            const newSet = new Set(prev);
            newSet.add(node.id);
            return newSet;
          });
        }}
        onNodeDrag={(node) => {
          // Update fixed coordinates while dragging
          node.fx = node.x;
          node.fy = node.y;
        }}
        onNodeDragEnd={(node) => {
          // Keep the node fixed where user dropped it
          node.fx = node.x;
          node.fy = node.y;
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // Bigger nodes for better visibility and to fit full names
          const nodeRadius = 40; // Increased from 30 to make nodes bigger
          const fontSize = 12;   // Increased font size for better readability
          
          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Add subtle border to manually positioned nodes
          if (node.fx !== undefined && node.fy !== undefined) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          
          // Draw the short label inside
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.font = `bold ${fontSize}px Sans-Serif`;
          
          // Split text into multiple lines if needed
          const maxLineWidth = nodeRadius * 1.8; // Maximum width for text
          const words = node.shortLabel.split(' ');
          let lines = [];
          let currentLine = '';
          
          words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxLineWidth && currentLine !== '') {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          });
          
          if (currentLine) {
            lines.push(currentLine);
          }
          
          // Draw multiline text centered in node
          const lineHeight = fontSize * 1.2;
          const totalHeight = lines.length * lineHeight;
          const startY = node.y - (totalHeight / 2) + (lineHeight / 2);
          
          lines.forEach((line, i) => {
            ctx.fillText(
              line,
              node.x,
              startY + (i * lineHeight)
            );
          });
          
          // Add highlight when hovering
          if (node === selectedNode) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3; // Thicker highlight border
            ctx.stroke();
            
            // Add outer glow for selected node
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius + 5, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 4;
            ctx.stroke();
          }

          // Draw EUDR compliance flag if the field exists
          const eudrStatus = getEudrComplianceStatus(node);
          if (eudrStatus !== null) {
            // Position the badge at the top-right corner of the node
            const badgeRadius = 10;
            const badgeX = node.x + nodeRadius * 0.7;
            const badgeY = node.y - nodeRadius * 0.7;
            
            // Draw the badge circle
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, badgeRadius, 0, 2 * Math.PI);
            
            // Set the badge color based on compliance status
            if (eudrStatus) {
              ctx.fillStyle = '#4CAF50';  // Green for compliant
            } else {
              ctx.fillStyle = '#F44336';  // Red for non-compliant
            }
            
            ctx.fill();
            
            // Add a white border
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Add a check mark or X symbol
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Sans-Serif';
            
            if (eudrStatus) {
              ctx.fillText('✓', badgeX, badgeY);  // Checkmark for compliant
            } else {
              ctx.fillText('✗', badgeX, badgeY);  // X for non-compliant
            }
          }
        }}
      />
      
      {renderNodeTooltip()}
    </div>
  );
};

export default GraphVisualization;