import { Button, DatePicker, Spinner } from "@heroui/react";

import { AddIcon, SendIcon } from "@/assets/icons";
import ExpensesInputGroup from "@/features/expenses/components/ExpensesInputGroup";
import DefaultLayout from "@/layouts/default";
import useGetCategories from "@/hooks/others/useGetCategories";
import useExpensesFormData from "@/hooks/expenses/useExpensesFormData";
import useFormSubmit from "@/hooks/expenses/useFormSubmit";
import useGetCards from "@/hooks/cards/useGetCards";

export default function AddExpenses() {
    const { spendCategories, isLoading, didSpendCategoriesFetchFail } = useGetCategories();
    const { paymentMethods, isPaymentMethodsLoading, didPaymentMethodsFetchFAil } = useGetCards();
    const {
        formData,
        purchaseDate,
        addItem,
        removeItem,
        handlePurchaseDateChange,
        handleInputChange,
        handleSpendCategoryChange,
        handlePaymentMethodChange,
        resetFields
    } = useExpensesFormData();

    const { submitForm, isSubmitting } = useFormSubmit();

    const handleSubmit = async () => {
        if (purchaseDate === null) return;

        const result = await submitForm(purchaseDate, formData);

        if (result) {
            resetFields();
        }
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
                isDisabled={isSubmitting}
            />
            {formData.map(item => (
                <ExpensesInputGroup key={item.id}
                    categories={spendCategories}
                    handleInputChange={handleInputChange}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                    handleSpendCategoryChange={handleSpendCategoryChange}
                    item={item}
                    paymentMethods={paymentMethods}
                    removeItem={removeItem}
                    disableFields={isSubmitting}
                />
            ))}
            {(!didPaymentMethodsFetchFAil && !didSpendCategoriesFetchFail) && (
                <div className="mt-8 mb-4 flex items-center justify-center max-w-[1400px]">
                    <Button className="mx-1" color="secondary"  size="sm"
                        startContent={<AddIcon />} 
                        onPress={addItem}
                        isDisabled={purchaseDate === null || isSubmitting}
                        
                    >Add New Line</Button>
                    <Button className="mx-1" color="primary"
                        size="sm"
                        startContent={isSubmitting ? "" : <SendIcon />} 
                        onPress={handleSubmit}
                        isDisabled={formData.length === 0 || purchaseDate === null || isSubmitting}
                        isLoading={isSubmitting}
                    >
                        { isSubmitting ? "Processing..." : "Submit Expenses" }
                    </Button>
                </div>
            )}
            
        </DefaultLayout>
    );
}