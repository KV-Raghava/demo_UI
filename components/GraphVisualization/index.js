// GraphVisualization module exports
export { default as GraphVisualization } from './lib/GraphVisualization';
export { default as FarmMap } from './lib/FarmMap';
export { default as FarmMapGoogle } from './lib/FarmMapGoogle';
export * from './data/data';

// Export convenience bundle
export const GraphVisualizationBundle = {
  GraphVisualization: require('./lib/GraphVisualization').default,
  FarmMap: require('./lib/FarmMap').default,
  FarmMapGoogle: require('./lib/FarmMapGoogle').default,
  data: require('./data/data').sampleData
};