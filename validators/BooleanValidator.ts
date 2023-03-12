import { isNil } from "../utils/isNil";
import { BaseValidator } from "./types/types";

type ValidationError = string

type ValidationFunction = () => boolean;
const VALID_STRINGS = ["True", "true" , "False" , "false"]

export class BooleanValidation extends BaseValidator<boolean> {
    private schema: ValidationFunction[] = [];
    private errors: ValidationError[] = [];
    private value: any

    /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
    private isBoolean(): this {
        this.schema.splice(0, 0, () => {
            const input = this.value
            if (!isNil(input)) {
                if (typeof input === "boolean") {
                    return true
                }else if(typeof input === "string" && VALID_STRINGS.includes(input)){ 
                    // validate a string with values defined in VALID_STRINGS
                    this.value =  input.toLowerCase() === "true"
                    return true
                } else {
                    this.errors.push("Input must be a boolean")
                    return false
                }
            } else {
                // if value is nullable ignore check , this should be handled by required fn
                return true
            }
        })
        return this
    }

    public isTrue(): this {
        this.schema.push(() => {
            const input = this.value
            if (input !== true) {
                this.errors.push("Field must be true");
                return false;
            }
            return true;
        });
        return this;
    }

    public isFalse(): this {
        this.schema.push(() => {
            const input = this.value
            if (input !== false) {
                this.errors.push("Field must be false");
                return false;
            }
            return true;
        });
        return this;
    }

    public required(): this {
        this.schema.push(() => {
            const input = this.value
            if (isNil(input)) {
                this.errors.push("Field is required");
                return false;
            }
            return true;
        });
        return this;
    }

    public validate(input: any): boolean {
        this.errors = [];
        this.value = input
        this.isBoolean() // default validation
        const isValid = this.schema.every((validator) => validator());
        if (isValid) {
            return this.value
        }
        throw new Error(JSON.stringify(this.getErrors()))
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }
}