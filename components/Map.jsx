import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapData } from '../src/data/mapData';
import L from 'leaflet';
import '../components/GraphVisualization/styles/GraphStyles.css'; // Import the same styles used by Graph component

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icons for different node types
const getMarkerIcon = (type) => {
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

  const color = colorMap[type] || '#607D8B'; // Default to gray if type not found

  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:${color}; 
                      width:15px; 
                      height:15px; 
                      border-radius:50%; 
                      border:3px solid white; 
                      box-shadow:0 0 4px rgba(0,0,0,0.4);">
           </div>`,
    iconSize: [15, 15],
    iconAnchor: [10, 10]
  });
};

// Get line color for connections
const getLineColor = (sourceType, targetType) => {
  // Create specific colors for different connection types
  if (sourceType === 'Farmer' && targetType === 'Farmer_Group') {
    return '#4CAF50'; // Green
  } else if (sourceType === 'Farmer_Group' && targetType === 'Local_Buying_Agent') {
    return '#2196F3'; // Blue
  } else if (sourceType === 'Local_Buying_Agent' && targetType === 'Lot') {
    return '#FFA500'; // Orange
  } else if (sourceType === 'Lot' && targetType === 'Purchase_Order') {
    return '#9C27B0'; // Purple
  } else if (sourceType === 'Purchase_Order' && targetType === 'PMB') {
    return '#F44336'; // Red
  } else {
    return '#607D8B'; // Default gray
  }
};

// Helper function to format type (replace underscores with spaces)
const formatType = (type) => {
  return type.replace(/_/g, ' ');
};

// Custom tooltip style
const tooltipStyle = { 
  backgroundColor: '#fff', 
  border: 'none', 
  borderRadius: '4px', 
  boxShadow: '0 1px 5px rgba(0,0,0,0.2)', 
  padding: '8px 12px', 
  fontSize: '13px', 
  maxWidth: '250px'
};

const Map = () => {
  const [connections, setConnections] = useState([]);
  // Fix: Access the nodes array correctly from the new data structure
  const nodes = mapData[0]?.node || [];
  const [hoveredNode, setHoveredNode] = useState(null);
  
  // Find center of the map based on node coordinates
  const center = nodes.length > 0 
    ? [
        nodes.reduce((sum, node) => sum + node.attributes.latitude, 0) / nodes.length,
        nodes.reduce((sum, node) => sum + node.attributes.longitude, 0) / nodes.length
      ] 
    : [-6.33, -76.40]; // Default center (Peru coffee region)

  useEffect(() => {
    // Process connections between nodes using the edges from mapData
    const nodeConnections = [];
    const edges = mapData[0]?.edges || [];
    
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.v_id === edge.from_id);
      const targetNode = nodes.find(n => n.v_id === edge.to_id);
      
      if (sourceNode && targetNode) {
        nodeConnections.push({
          source: [sourceNode.attributes.latitude, sourceNode.attributes.longitude],
          target: [targetNode.attributes.latitude, targetNode.attributes.longitude],
          sourceType: sourceNode.v_type,
          targetType: targetNode.v_type,
          sourceId: sourceNode.v_id,
          targetId: targetNode.v_id
        });
      }
    });
    
    setConnections(nodeConnections);
  }, [nodes]);

  // CSS for map container - we'll replace this with the graph container class
  const mapContainerStyle = {
    height: '100%',
    width: '100%'
  };

  // CSS for tooltip content
  const tooltipContentStyle = {
    padding: '0px',
    margin: '0px'
  };

  // CSS for hover info
  const hoverInfoStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
    zIndex: 1000,
    maxWidth: '300px',
    display: hoveredNode ? 'block' : 'none'
  };

  return (
    <div className="graph-container">
      {/* Hover info box that displays detailed information about the hovered node */}
      <div style={hoverInfoStyle}>
        {hoveredNode && (
          <>
            <h3 style={{ margin: '0 0 8px 0' }}>{hoveredNode.attributes.farmer_name || hoveredNode.attributes.buying_agent_name || hoveredNode.v_id}</h3>
            <div style={{ marginBottom: '5px' }}>
              <strong>Type:</strong> {formatType(hoveredNode.v_type)}
            </div>
            <div style={{ marginBottom: '5px' }}>
              <strong>ID:</strong> {hoveredNode.v_id}
            </div>
            <div>
              <strong>Location:</strong> {hoveredNode.attributes.latitude.toFixed(4)}, {hoveredNode.attributes.longitude.toFixed(4)}
            </div>
          </>
        )}
      </div>
      
      <div style={mapContainerStyle}>
        <MapContainer 
          center={center} 
          zoom={3} 
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Draw connections between nodes */}
          {connections.map((connection, index) => (
            <Polyline
              key={`connection-${index}`}
              positions={[connection.source, connection.target]}
              color={getLineColor(connection.sourceType, connection.targetType)}
              weight={2}
              opacity={0.8}
            >
              <Tooltip direction="center" permanent={false} style={tooltipStyle}>
                <div style={tooltipContentStyle}>
                  {formatType(connection.sourceType)} → {formatType(connection.targetType)}
                </div>
              </Tooltip>
            </Polyline>
          ))}
          
          {/* Place markers for each node */}
          {nodes.map(node => (
            <Marker 
              key={node.v_id}
              position={[node.attributes.latitude, node.attributes.longitude]}
              icon={getMarkerIcon(node.v_type)}
              eventHandlers={{
                mouseover: () => {
                  setHoveredNode(node);
                },
                mouseout: () => {
                  setHoveredNode(null);
                }
              }}
            >
              <Tooltip direction="top" style={tooltipStyle}>
                <div style={tooltipContentStyle}>
                  <strong>{node.attributes.farmer_name || node.attributes.buying_agent_name || node.attributes.id || node.v_id}</strong>
                  <br/>
                  {formatType(node.v_type)}
                </div>
              </Tooltip>
              <Popup>
                <div>
                  <h3>{node.attributes.farmer_name || node.attributes.buying_agent_name || node.attributes.id || node.v_id}</h3>
                  <p><strong>Type:</strong> {formatType(node.v_type)}</p>
                  <p><strong>ID:</strong> {node.v_id}</p>
                  <p><strong>Coordinates:</strong> {node.attributes.latitude}, {node.attributes.longitude}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;