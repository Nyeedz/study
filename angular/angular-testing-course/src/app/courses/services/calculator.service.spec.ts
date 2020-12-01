import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    //Initialization logic
    // spy ve quantas vezes uma função foi chamada / Mocar os valores
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]); //"log" precisa ser o nome da função a ser mocada pela jasmine

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.inject<CalculatorService>(CalculatorService);
  });

  it("should add two numbers", () => {
    const result = calculator.add(2, 2);

    expect(result).toBe(4, "unexpected sum result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
