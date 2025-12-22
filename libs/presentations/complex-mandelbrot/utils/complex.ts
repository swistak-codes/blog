export class Complex {
  constructor(
    private readonly real: number,
    private readonly imag: number,
  ) {}

  add(other: Complex) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  subtract(other: Complex) {
    return new Complex(this.real - other.real, this.imag - other.imag);
  }

  multiply(other: Complex) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real,
    );
  }

  divide(other: Complex) {
    const denom = other.real ** 2 + other.imag ** 2;
    return new Complex(
      (this.real * other.real + this.imag * other.imag) / denom,
      (this.imag * other.real - this.real * other.imag) / denom,
    );
  }

  modulus() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  argument() {
    return Math.atan2(this.imag, this.real);
  }

  toString() {
    return `${this.real} + ${this.imag}i`;
  }

  square() {
    return new Complex(
      this.real * this.real - this.imag * this.imag,
      2 * this.real * this.imag,
    );
  }

  absSqr() {
    return this.real * this.real + this.imag * this.imag;
  }
}
