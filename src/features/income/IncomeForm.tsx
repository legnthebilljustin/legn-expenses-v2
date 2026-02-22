import { Button } from "@heroui/button";
import { DatePicker, Input } from "@heroui/react";

import { SendIcon } from "@/assets/icons";

export default function IncomeForm() {
    return (
        <div className="max-w-[800px] mx-auto">
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                <DatePicker className="max-w-[300px]" label="Transaction Date"
                    size="sm"
                />
                <Input className="max-w-[300px]" label="Source" 
                    placeholder="Source of funds"
                    size="sm"
                />
                <Input className="max-w-[300px]" label="Amount" placeholder="0" 
                    size="sm" type="number"
                />
                
            </div>
            <div className="text-center mt-4">
                <Button className="px-3 max-w-[150px]" 
                    color="success"
                    size="sm" startContent={<SendIcon />}
                    variant="flat" >Add Income
                </Button>
            </div>
        </div>
        
    );
}