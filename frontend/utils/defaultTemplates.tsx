export const defaultTemplateJs =`export function sum (a, b) {
  return a + b
}

export function sub (a, b) {
  return a - b
}
`;

export const defaultTemplateTs = `export function sum (a: number, b: number) {
  return a + b
}

export function sub (a: number, b: number) {
  return a - b
}
`;

export const defaultTemplatePy = `def sum(a, b):
  return a + b

def sub(a, b):
  return a - b
`;

export const defaultTemplateGo = `package golang

// Add is our function that sums two integers
func Sum(x, y int) (res int) {
	return x + y
}

func Sub(x, y int) (res int) {
	return x - y
}
`;