import pom from "../../validators";
import PomValidationError from "../../validators/PomValidationError";
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

  it("should validate a regex", () => {
    const schema = pom.string().regex(/^[a-z]+$/);
    expect(schema.validate("abc")).toEqual("abc");
    expect(() => schema.validate("123123")).toThrowError();
    expect(() => schema.validate(undefined)).not.toThrowError();
  });

  it("conditional validation should work if string includes a validate min 5", () => {
    const schema = pom
      .string()
      .required()
      .when({
        is: (val: any) => val.includes("a"),
        then: (updater) => updater.min(5),
      });
    expect(() => schema.validate("a123")).toThrowError();
    expect(() => schema.validate("c123")).not.toThrowError();
  });

  it("conditional validation should work if string includes a validate min 5 otherwise min 3", () => {
    const schema = pom
      .string()
      .required()
      .when({
        is: (val: any) => val.includes("a"),
        then: (updater) => updater.min(5),
        otherwise: (updater) => updater.max(8).min(3),
      });
    expect(() => schema.validate("a123")).toThrowError();
    expect(() => schema.validate("a12345")).not.toThrowError();
    expect(() => schema.validate("83")).toThrowError();
    expect(() => schema.validate("123456789")).toThrowError();
  });

  it("add custom validations", () => {
    const schema = pom
      .string()
      .required()
      .custom((val) => {
        if (val.includes("ab")) {
          return true;
        }
        return false;
      }, "abIncude");

    expect(() => schema.validate("a123")).toThrowError();
    expect(() => schema.validate("ab123")).not.toThrowError();
  });

  it("custom and normal validation should work together, custom is valid if string includes ab", () => {
    const schema = pom
      .string()
      .required()
      .min(4)
      .custom((val) => {
        if (val.includes("ab")) {
          return true;
        }
        return false;
      }, "abIncude");

    expect(() => schema.validate("a123")).toThrowError();
    expect(() => schema.validate("ab1")).toThrowError();
    expect(() => schema.validate("ab1234")).not.toThrowError();
  });

  it("custom email must include aa and be an email", () => {
    const schema = pom
      .string()
      .required()
      .email()
      .custom((val) => {
        return val.includes("aa");
      }, "aaInclude");

    expect(() => schema.validate("a123")).toThrowError();
    expect(schema.validate("aa@email.com")).toBe("aa@email.com");
  });
});
