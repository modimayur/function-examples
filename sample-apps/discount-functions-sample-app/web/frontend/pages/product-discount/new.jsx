import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
  serializeDiscount,
} from '../../components/function-configuration/ProductDiscount';

export default function CreateProductDiscountPage() {
  return (
    <DiscountCreatePage
      scriptUuid={process.env.PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      serializeDiscount={serializeDiscount}
    />
  );
}
