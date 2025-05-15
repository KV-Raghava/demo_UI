# Graph Visualization Module

A reusable React module for supply chain graph visualization including maps and network diagrams.

## Components

This module contains the following components:

- **GraphVisualization** - Interactive supply chain graph visualization
- **FarmMap** - Map visualization using Leaflet
- **FarmMapGoogle** - Map visualization using Google Maps

## Usage

### Basic Import

Import individual components as needed:

```js
import { GraphVisualization, FarmMap, FarmMapGoogle } from '../components/GraphVisualization';
import { sampleData } from '../components/GraphVisualization/data/data';
```

### Use in React Components

```jsx
function SupplyChainView() {
  return (
    <div className="supply-chain-container">
      <GraphVisualization data={sampleData} />
    </div>
  );
}

function MapView() {
  return (
    <div className="map-container">
      <FarmMap data={sampleData} />
      {/* Or */}
      <FarmMapGoogle data={sampleData} />
    </div>
  );
}
```

### Dependencies

This module requires the following packages:

- react
- react-force-graph-2d
- d3
- leaflet & react-leaflet (for FarmMap)
- @react-google-maps/api (for FarmMapGoogle)

Make sure to install these dependencies in your project.

## Data Format

The visualization expects data in the following format:

```js
[
  {
    node: [
      {
        v_id: "unique-id",
        v_type: "Node_Type",
        attributes: {
          // Node attributes
        }
      },
      // More nodes...
    ],
    edges: [
      {
        e_type: "Edge_Type",
        from_id: "source-node-id",
        to_id: "target-node-id",
        attributes: {
          // Edge attributes
        }
      },
      // More edges...
    ]
  }
]
```