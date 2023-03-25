POM (Plain Old JavaScript Object Models) is a library that provides a simple and intuitive way to define and validate JavaScript objects. One of the key features of POM is the ability to validate strings using a variety of rules.


String Validation Rules
Required
The `required()` rule checks if a string is not null or undefined.


```typescript
const schema = pom.string().required();
schema.validate(''); // throws an error
schema.validate(undefined); // throws an error
schema.validate('hello world'); // returns 'hello world'
```
### Min and Max Length
>The min() and max() rules check the minimum and maximum length of a string respectively.


```typescript
const schema = pom.string().min(5).max(10);
schema.validate('12345678910'); // throws an error because it exceeds max length
schema.validate('123'); // throws an error because it's shorter than min length
schema.validate('12345'); // returns '12345'
```
### Email
> The email() rule checks if a string is a valid email address.


```typescript
const schema = pom.string().email();
schema.validate('test@example.com'); // returns 'test@example.com'
schema.validate('invalid email'); // throws an error
```
### Regular Expression
> The regex() rule checks if a string matches a regular expression.


```typescript
const schema = pom.string().regex(/^[a-z]+$/);
schema.validate('abc'); // returns 'abc'
schema.validate('123123'); // throws an error
```
### Custom Validation
POM allows you to define custom validation rules using the custom() method. This method takes a validation function that returns an empty string if the validation passes, or an error message if it fails.


```typescript
const schema = pom.string().custom((value) => {
  if (value.includes('ab')) {
    return '';
  }
  return 'Input must include ab';
}, 'abInclude');
schema.validate('a123'); // throws an error
schema.validate('ab123'); // returns 'ab123'
```


### Conditional Validation

POM allows you to define conditional validation rules using the when() method. This method takes an object with two properties: is and then.

The is property is a function that takes the value being validated and returns a boolean indicating whether the validation should be applied.

The then property is a function that takes an updater object, which can be used to modify the validation rules for the current schema.


```typescript
const schema = pom
  .string()
  .required()
  .when({
    is: (value) => value.includes('a'),
    then: (updater) => updater.min(5),
  });

schema.validate('a123'); // throws an error
schema.validate('c123'); // returns 'c123'
```
You can also define an otherwise property to apply different validation rules when the is function returns false.

```typescript
const schema = pom
  .string()
  .required()
  .when({
    is: (value) => value.includes('a'),
    then: (updater) => updater.min(5),
    otherwise: (updater) => updater.max(8).min(3),
  });

schema.validate('a123'); // throws an error
schema.validate('a12345'); // returns 'a12345'
schema.validate('83'); // throws an error
schema.validate('123456789'); // throws an error
```



# Number Validation

To validate a number using POM, you can use the pom.number() method. This method returns a schema object that you can use to define validation rules for numbers.

Here is an example of how to define a schema that validates a number:


```typescript
import pom from '@pomhq/pom';

const schema = pom.number().min(5).max(10);
const result = schema.validate(7);

console.log(result); // 7
```
In the above example, we first import the POM library and create a schema that requires a number between 5 and 10. We then call the validate() method on the schema with a value of 7. Since 7 is between 5 and 10, the validate() method returns 7.



```typescript
min(value: number): specifies the minimum value that the number can have
max(value: number): specifies the maximum value that the number can have
positive(): specifies that the number must be positive
negative(): specifies that the number must be negative
integer(): specifies that the number must be an integer
required(): specifies that the number is required and cannot be null, undefined or NaN
```
## Examples
> Here are some examples of how to use these methods to define validation rules for numbers:


```typescript
const schema = pom.number().min(5).max(10);
schema.validate(7); // returns 7
schema.validate(3); // throws an error because 3 is less than the minimum value of 5
schema.validate(12); // throws an error because 12 is greater than the maximum value of 10
```
```typescript
const schema = pom.number().positive();
schema.validate(5); // returns 5
schema.validate(-5); // throws an error because the number is not positive
```
```typescript
const schema = pom.number().integer();
schema.validate(5); // returns 5
schema.validate(5.5); // throws an error because the number is not an integer
```

```typescript
const schema = pom.number().required();
schema.validate(5); // returns 5
schema.validate(null); // throws an error because the number is null
schema.validate(undefined); // throws an error because the number is undefined
schema.validate(NaN); // throws an error because the number is NaN
```
### Conclusion
POM provides a simple and easy-to-use API for validating numbers. By using POM's fluent API, you can easily define and enforce validation rules for your data schemas.