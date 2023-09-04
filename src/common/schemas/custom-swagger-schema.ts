export const AirQualityDataSwaggerSchema = {
  type: 'object',
  properties: {
    ts: { type: 'string' },
    aqius: { type: 'number' },
    mainus: { type: 'string' },
    aqicn: { type: 'number' },
    maincn: { type: 'string' },
  },
};

export const AirQualityZoneResultSwaggerSchema = {
  type: 'object',
  properties: {
    Result: {
      type: 'object',
      properties: {
        Pollution: {
          ...AirQualityDataSwaggerSchema,
        },
      },
    },
  },
};

export const DateTimeSwaggerSchema = {
  type: 'object',
  properties: {
    date: { type: 'string' },
    time: { type: 'string' },
  },
};

export const SavedAirQualitySwaggerSchema = {
  type: 'array',
  items: {
    ...AirQualityDataSwaggerSchema,
  },
};
