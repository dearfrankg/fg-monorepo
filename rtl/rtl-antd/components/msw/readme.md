# Make a working example with msw

## FIRST ATTEMPT WITH NEXT

- attempted msw test using next - msw was not intercepting
- after many attempts... looke for working examples

## ONLINE CRA EXAMPLE

- installed online example that uses cra and axios -- works!!

## REPRODUCE CRA EXAMPLE

- attempt to reproduce cra and axios -- broken
  -- error with import
  -- solution: `react-scripts test --transformIgnorePatterns "node_modules/(?!@codemirror)/"`
  -- works!!
  -- I don't know why it works - something about jest not transpiling under node_modules

## REPRODUCE WITH NEXT

- attempt to reproduce with next and axios -- works!!

## ATTEMPT TO FIX FIRST ATTEMPT

- hmmm
-
