const normalize = (entities) => {
  const normalized = [];
  entities.forEach((entity) => {
    normalized[entity.id] = {
      body: entity,
    };
  });
  return normalized;
}

export default normalize;
