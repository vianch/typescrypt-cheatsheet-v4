# TypeScrypt-cheatsheet-v4 

## Arrays and tuples
#### Array of strings
``` string[] ``` or ``` Array<string> ```
#### Array of functions that return strings
```tsx (() => string)[] ``` or ``` { (): string; }[] ``` or ``` Array<() => string> ```
#### Basic tuples
```tsx 	
let myTuple: [ string, number, boolean? ];
myTuple = [ 'test', 42 ];
```
#### Variadic tuples
```tsx
type Numbers = [number, number];
type Strings = [string, string];
 
type NumbersAndStrings = [...Numbers, ...Strings];  // [number, number, string, string]
let myTuple: NumbersAndStrings;
myTuple = [ 1, 2, 'test1', 'test2' ];
```

## Interfaces
#### Interface declaration
```tsx
class Someclass {}

interface Parent {
  parentProperty: Type;
  x: number;
  y: number;
  z?: number;
}

interface Child extends Parent, SomeClass {
    property: Type;
    optionalProp?: Type;
    optionalMethod?(argument: Type): ReturnType;
}
```
- Interfaces can also **extend** other **interfaces** or **classes** using the `extends` keyword in order to compose more complex types out of simple types

#### Interface with multiple types
```tsx
interface Pair<T1, T2> {
    first: T1;
    second: T2;
}
```

## Types
#### Type alias
```tsx
 type Name = string;

  type Direction = 'left' | 'right';

  type ElementCreator = (type: string) => Element;

  type Point = { x: number, y: number };

  type Point3D = Point & { z: number };

  type PointProp = keyof Point; // 'x' | 'y'

  const point: Point = { x: 1, y: 2 };

  type PtValProp = keyof typeof point; // 'x' | 'y'
```

#### Conditional types
```tsx
type Swapper = <T extends number | string>
    (value: T) => T extends number ? string : number;
```
equivalent to (if T is Number)
`(value: number) => number`
equivalent to (if T is String)
`(value: string) => string`

#### Conditional mapped types
```tsx
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

type StringProps<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
};

type PersonStrings = StringProps<Person>;

// PersonStrings is "firstName" | "lastName"
```
#### Exclude
`type Excluded = Exclude<string | number, string>;` equivalent to  `number`
#### Extract
`type Extracted = Extract<string | number, string>;` equivalent to `string`

#### InstanceType
```tsx
class Renderer() {}
type Instance = InstanceType<typeof Renderer>;
```
is equivalent to
```
Renderer
```

## Functions
#### Function type
``` (argument: Type, argN: Type) => Type; ``` 
or 
``` (argument: Type, argN: Type): Type; ```
#### Function type with optional param
``` (argument: Type, optional?: Type) => ReturnType ```
#### Function type with rest param
``` (argument: Type, ...allOtherArgs: Type[]) => ReturnType ```
#### Default argument
``` function myFunction(argument = 'default'): ReturnType {} ```
#### Arrow function
``` (argument: Type): ReturnType => { ...; return value; } ```
or
``` (argument: Type): ReturnType => value ```
#### Overloads
```tsx 
function myFunction(a: string): number;
function myFunction(a: number): string;
function myFunction(a: string | number): string | number {
    ...
}
```

## Class
```tsx
interface Child {
  methodProperty: (argument: Type) => ReturnType;
}

interface OtherChild {
  overloadedMethod(argument: Type): ReturnType;
}

class Parent {}

class Child extends Parent implements Child, OtherChild {
    public property: Type;
    public argument: Type;
    public defaultProperty = 'default value';
    static staticProperty: Type;
    private readonly _privateReadonlyProperty: Type;
    private _privateProperty: Type;

    constructor(argument: Type, public argumentTwo) {
        super(argument);
        this.argument = argument
    }

    static staticMethod(): ReturnType {}
    private _privateMethod(): Type {}

    public methodProperty: (argument: Type) => ReturnType;
    public overloadedMethod(argument: Type): ReturnType;
    public overloadedMethod(argument: OtherType): ReturnType;
    public overloadedMethod(argument: CommonT): CommonReturnT {}
}
```

## Types or Interfaces?
- If you would like a heuristic, use interface until you need to use features from type.
- Here's a helpful rule of thumb:
1. always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

1. consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

### Useful table for Types vs Interfaces

It's a nuanced topic, don't get too hung up on it. Here's a handy table:

| Aspect                                          | Type | Interface |
| ----------------------------------------------- | :--: | :-------: |
| Can describe functions                          |  ✅  |    ✅     |
| Can describe constructors                       |  ✅  |    ✅     |
| Can describe tuples                             |  ✅  |    ✅     |
| Interfaces can extend it                        |  ⚠️  |    ✅     |
| Classes can extend it                           |  🚫  |    ✅     |
| Classes can implement it (`implements`)         |  ⚠️  |    ✅     |
| Can intersect another one of its kind           |  ✅  |    ⚠️     |
| Can create a union with another one of its kind |  ✅  |    🚫     |
| Can be used to create mapped types              |  ✅  |    🚫     |
| Can be mapped over with mapped types            |  ✅  |    ✅     |
| Expands in error messages and logs              |  ✅  |    🚫     |
| Can be augmented                                |  🚫  |    ✅     |
| Can be recursive                                |  ⚠️  |    ✅     |

⚠️ In some cases

(source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

![typesVsInterfacesTweet](https://user-images.githubusercontent.com/1800887/153976740-ea5b15f2-0d09-46b5-8783-bb388c0eb694.png)

#### Types Interface Equivalent 
![typesEquivalent](https://user-images.githubusercontent.com/1800887/153990739-6420b14b-9df4-483c-9b7f-b35e11a364df.png)

# Other types

## Enums
```tsx
 enum Options {
    FIRST,
    EXPLICIT = 1,
    BOOLEAN = Options.FIRST | Options.EXPLICIT,
    COMPUTED = getValue()
}

enum Colors {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF"
}
```
## Union and intersection types
#### Union
``` let myUnionVariable: number | string; ```
#### Intersection
``` let myIntersectionType: Foo & Bar; ```

## Utility types
#### Partial
``` Partial<{ x: number; y: number; z: number; }> ```
equivalent to
``` { x?: number; y?: number; z?: number; } ```
#### Readonly
``` Readonly<{ x: number; y: number; z: number; }> ```
equivalent to
```tsx
{
    readonly x: number;
    readonly y: number;
    readonly z: number;
}
```
#### Record
``` Record<'x' | 'y' | 'z', number> ```
equivalent to 
```  { x: number; y: number; z: number; } ```

#### Assertions / Cast
`let val = someValue as string;`

## Ambient declarations
#### Global
`declare const $: JQueryStatic;`
#### Module
```tsx
declare module "foo" {
    export class Bar { ... }
}
```

## React
### Hooks
#### useState
```tsx
const [user, setUser] = useState<IUser | null>(null);

// later...
setUser(newUser);
```

#### useRef
```tsx
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forgot to assign it
    if (!divRef.current) throw Error("divRef is not assigned");

    // Now divRef.current is sure to be HTMLDivElement
    doSomethingWith(divRef.current);
  });

  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```


## Sources:
[TypeScrypt-React cheat sheet](https://github.com/typescript-cheatsheets/react/blob/main/README.md).
[Differences between types-aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
[HandBook](https://www.typescriptlang.org/static/TypeScript%20Control%20Flow%20Analysis-8a549253ad8470850b77c4c5c351d457.png)
