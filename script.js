function add(num1, num2) {
	return num1 + num2;
}
function subtract(num1, num2) {
	return num1 - num2;
}
function multiply(num1, num2) {
	return num1 * num2;
}
function divide(num1, num2) {
	return num1 / num2;
}
function operate(func, num1, num2) {
	return func(num1, num2);
}
console.log(operate(add, 4, 5));
