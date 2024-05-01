import { Given, When, Then } from '@cucumber/cucumber';
import { add } from '../../src';

function assert(condition: any, message: string = "Assertion failed"): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

Given('I have a number {int}', function (number: number) {
    this.a = number;
});

Given('I have another number {int}', function (number: number) {
    this.b = number;
});

When('I add them', function () {
    this.result = add(this.a, this.b);
});

Then('I get {int}', function (expectedResult: number) {
    assert( this.result == expectedResult )
});