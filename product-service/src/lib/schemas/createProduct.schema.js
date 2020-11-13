const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        name: {
          description: "Product name is required!",
          default: "",
          type: "string",
        },
        code: {
          description: "Product code is required!",
          default: "",
          type: "string",
        },
      },
      required: ["name", "code"],
    },
  },
  required: ["body"],
};

export default schema;
