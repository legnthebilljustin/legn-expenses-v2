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
                    <DatePicker isRequired className="max-w-[300px]"
                        isDisabled={isSubmitting} label="Received Date" size="sm"
                        onChange={handleDateChange}
                    />
                    <Input isRequired className="max-w-[300px]" 
                        isDisabled={isSubmitting} label="Source"
                        name="source" placeholder="Source of funds"
                        size="sm"
                        value={formData.source}
                        onChange={handleInputChange}
                    />
                    <Input isRequired className="max-w-[300px]" isDisabled={isSubmitting} 
                        label="Amount" name="amount" placeholder="0" size="sm"
                        type="number"
                        value={formData.amount.toString()}
                        onChange={handleInputChange}
                    />
                    
                </div>
                <div className="text-center w-full">
                    <Button className="px-3 mt-3 max-w-[150px]" 
                        color="success" disabled={isSubmitting}
                        isLoading={isSubmitting} size="sm"
                        startContent={<SendIcon />} type="submit"
                        variant="flat"
                    >Add Income
                    </Button>
                </div>
            </Form>
        </div>
        
    );
}