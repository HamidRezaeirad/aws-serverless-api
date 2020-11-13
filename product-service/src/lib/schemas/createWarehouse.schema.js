const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        name: {
          description: "Warehouse name is required!",
          default: "",
          type: "string",
        },
        location: {
          description: "Warehouse location is required!",
          default: "",
          type: "string",
        },
      },
      required: ["name", "location"],
    },
  },
  required: ["body"],
};

export default schema;
