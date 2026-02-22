import { Button } from "@heroui/button";
import { DatePicker, Input, Form } from "@heroui/react";

import { SendIcon } from "@/assets/icons";
import useAddIncome from "@/hooks/income/useAddIncome";

export default function IncomeForm() {
    const { 
        formData, 
        handleInputChange, 
        handleDateChange, 
        isSubmitting, 
        handleSubmit 
    } = useAddIncome();

    return (
        <div className="max-w-[800px] mx-auto">
            <Form onSubmit={handleSubmit}>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                    <DatePicker className="max-w-[300px]" label="Received Date"
                        size="sm" isRequired onChange={handleDateChange}
                        isDisabled={isSubmitting}
                    />
                    <Input className="max-w-[300px]" label="Source" 
                        placeholder="Source of funds" name="source"
                        size="sm" isRequired
                        value={formData.source}
                        onChange={handleInputChange}
                        isDisabled={isSubmitting}
                    />
                    <Input className="max-w-[300px]" label="Amount" placeholder="0" 
                        size="sm" type="number" isRequired name="amount"
                        value={formData.amount.toString()}
                        onChange={handleInputChange}
                        isDisabled={isSubmitting}
                    />
                    
                </div>
                <div className="text-center w-full">
                    <Button className="px-3 mt-3 max-w-[150px]" 
                        color="success" type="submit"
                        size="sm" startContent={<SendIcon />}
                        variant="flat" disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >Add Income
                    </Button>
                </div>
            </Form>
        </div>
        
    );
}