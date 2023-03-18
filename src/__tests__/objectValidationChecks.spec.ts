import pom from "../validators";
describe("numberValidationChecks", () => {
  it("checks if the value is an array", () => {
    const schema = pom.object({
      name: pom.string(),
    });
    expect(() => schema.validate([])).toThrowError();
  });

  it("checks if null or nullable is passed and object is not required it should pass", () => {
    const schema = pom.object({
      name: pom.string(),
    });
    expect(() => schema.validate(undefined)).not.toThrowError();
    expect(() => schema.validate(null)).not.toThrowError();
    expect(() => schema.validate(NaN)).not.toThrowError();
  });

  it("should throw if schema has requierd but nullables are passed", () => {
    const schema = pom
      .object({
        name: pom.string(),
      })
      .required();
    expect(() => schema.validate(undefined)).toThrowError();
    expect(() => schema.validate(null)).toThrowError();
    expect(() => schema.validate(NaN)).toThrowError();
  });

  it("checks if an object has field email and password", () => {
    const schema = pom.object({
      email: pom.string().email(),
      password: pom.string().min(5),
    });
    expect(() => schema.validate({})).toThrowError();
    expect(() => schema.validate({ email: "abc" })).toThrowError();
    expect(
      schema.validate({
        email: "you@email.com",
        password: "verystrongpassword",
      })
    ).toEqual({
      email: "you@email.com",
      password: "verystrongpassword",
    });
  });

  it("checks if an object has optional field and a required field", () => {
    const schema = pom.object({
      address: pom.string(),
      email: pom.string().required(),
    });
    expect(
      schema.validate({ address: "Delhi", email: "you@email.com" })
    ).toEqual({ address: "Delhi", email: "you@email.com" });
    expect(() => schema.validate({ address: "Delhi" })).toThrowError();

    expect(schema.validate({ email: "you@email.com" })).toEqual({
      email: "you@email.com",
    });
  });

  it("validates an object with nested object", () => {
    const schema = pom
      .object({
        address: pom
          .object({
            city: pom.string(),
            state: pom.string(),
          })
          .required(),
        email: pom.string().email().required(),
      })
      .required();
    expect(
      schema.validate({
        address: {
          city: "Delhi",
          state: "Delhi",
        },
        email: "you@email.com",
      })
    ).toStrictEqual({
      address: {
        city: "Delhi",
        state: "Delhi",
      },
      email: "you@email.com",
    });

    expect(() =>
      expect(
        schema.validate({
          address: {
            city: "Delhi",
            state: "Delhi",
          },
          email: "you@@email.com",
        })
      )
    ).toThrowError();

    expect(() =>
      expect(
        schema.validate({
          email: "you@email.com",
        })
      )
    ).toThrowError();
  });

  it("handles required at a nested level", () => {
    const schema = pom
      .object({
        address: pom
          .object({
            city: pom.string().required(),
            state: pom.string(),
          })
          .required(),
        email: pom.string().email().required(),
      })
      .required();
    expect(() =>
      expect(
        schema.validate({
          address: {
            city: "",
            state: "Delhi",
          },
          email: "you@gmail.com",
        })
      )
    ).toThrowError();
    expect(() =>
      expect(
        schema.validate({
          address: {
            city: "Email is empty",
            state: "Delhi",
          },
          email: "",
        })
      )
    ).toThrowError();
  });
});
