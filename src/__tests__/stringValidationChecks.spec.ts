import pom from "../validators";
describe("stringValidationChecks", () => {
  it("should throw when null or undefined in case REQUIRED string", () => {
    const schema = pom.string().required();
    expect(() => schema.validate(undefined)).toThrowError();
    expect(() => schema.validate(null)).toThrowError();
    expect(() => schema.validate(NaN)).toThrowError();
  });
  it("should throw error if an object or array is passed", () => {
    const schema = pom.string();
    expect(() => schema.validate({})).toThrowError();
    expect(() => schema.validate([])).toThrowError();
  });

  it("should throw when null or undefined in case REQUIRED string", () => {
    const schema = pom.string().required();
    expect(() => schema.validate(undefined)).toThrowError();
    expect(() => schema.validate(null)).toThrowError();
    expect(() => schema.validate(NaN)).toThrowError();
  });

  it("should return the string value if a valid number is passed", () => {
    const schema = pom.string().required();
    const result = schema.validate(123);
    expect(result).toBe("123");
    expect(typeof result).toBe("string");
  });

  it("should have min 5 or equal to 5", () => {
    const schema = pom.string().min(5).required();
    const result = schema.validate("abcdef");
    expect(result).toBe("abcdef");
    expect(() => schema.validate("abcd")).toThrowError();
  });

  it("should convert a number to string and then validate its min length", () => {
    const schema = pom.string().min(5).required();
    expect(() => schema.validate(6)).toThrowError();
    expect(schema.validate(12345)).toBe("12345");
  });

  it("should validate equal and max length", () => {
    const schema = pom.string().min(10).required();
    expect(() => schema.validate("123456789")).toThrowError();
    expect(schema.validate("1234567890")).toBe("1234567890");
  });

  it("should validate min and max together", () => {
    const schema = pom.string().min(5).max(10).required();
    expect(() => schema.validate("12345678910")).toThrowError(); // max check
    expect(() => schema.validate("123")).toThrowError(); // min check
    expect(schema.validate("123456")).toBe("123456"); //valid check
  });

  it("min max should not fail when null or undefined", () => {
    const schema = pom.string().min(5).max(10);
    expect(() => schema.validate(undefined)).not.toThrowError();
    expect(() => schema.validate(null)).not.toThrowError();
    expect(() => schema.validate(NaN)).not.toThrowError();
  });

  it("should validate email only when defined", () => {
    const schema = pom.string().email();
    expect(() => schema.validate(undefined)).not.toThrowError();
  });
});
