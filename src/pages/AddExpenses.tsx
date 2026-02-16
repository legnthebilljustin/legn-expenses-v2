import { Button, DatePicker, Spinner } from "@heroui/react";

import { AddIcon, SendIcon } from "@/assets/icons";
import ExpensesInputGroup from "@/features/expenses/components/ExpensesInputGroup";
import DefaultLayout from "@/layouts/default";
import useGetCategories from "@/hooks/others/useGetCategories";
import useExpensesFormData from "@/hooks/expenses/useExpensesFormData";
import useFormSubmit from "@/hooks/expenses/useFormSubmit";
import useGetCards from "@/hooks/cards/useGetCards";

export default function AddExpenses() {
    const { spendCategories, isLoading } = useGetCategories();
    const { paymentMethods, isPaymentMethodsLoading } = useGetCards()
    const {
        formData,
        purchaseDate,
        addItem,
        removeItem,
        handlePurchaseDateChange,
        handleInputChange,
        handleSpendCategoryChange,
        handlePaymentMethodChange
    } = useExpensesFormData();

    const { submitForm } = useFormSubmit();

    const handleSubmit = () => {
        if (purchaseDate === null) return;

        submitForm(purchaseDate, formData);
    };

    if (isLoading || isPaymentMethodsLoading) {
        return (
            <DefaultLayout>
                <div className="text-center">
                    <Spinner color="primary" variant="wave" />
                    <Spinner color="primary" variant="wave" />
                    <div className="text-sm font-italic mt-2 text-slate-400">Getting your form ready...</div>
                </div>;
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="mb-8">
                <div className="font-bold tracking-tight text-xl">Create new expenses</div>
                <div className="text-slate-400 text-sm font-light">Begin by selecting a transaction date. Your active credit cards will be included in the payment method options.</div>
            </div>
			
            <DatePicker isRequired className="max-w-[300px] mb-8" 
                label="Transasction Date" 
                onChange={handlePurchaseDateChange}
            />
            {formData.map(item => (
                <ExpensesInputGroup key={item.id}
                    categories={spendCategories}
                    handleInputChange={handleInputChange}
                    item={item}
                    paymentMethods={paymentMethods}
                    removeItem={removeItem}
                    handleSpendCategoryChange={handleSpendCategoryChange}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                />
            ))}
            <div className="mt-8 mb-4 flex items-center justify-center max-w-[1400px]">
                <Button className="mx-1" color="secondary" size="sm" startContent={<AddIcon />}
                    onPress={addItem} 
                    // isDisabled={purchaseDate === null}
                >Add New Line</Button>
                <Button className="mx-1" color="primary" size="sm" startContent={<SendIcon />} onPress={handleSubmit}>Submit Expenses</Button>
            </div>
        </DefaultLayout>
    );
}