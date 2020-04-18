import React from "react";
import { render, cleanup } from "@testing-library/react";
import PaymentMethodsComponent from "./paymentMethods";

describe("PaymentMethodsComponent", () => {

    it('should render component', () => {
        const { getByTestId } = render(<PaymentMethodsComponent />);
        expect(getByTestId("message").textContent).toBe("I am component");
    });
});