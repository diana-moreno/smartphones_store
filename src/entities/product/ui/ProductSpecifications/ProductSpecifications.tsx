import type { ProductDetail } from '../../model/product';
import styles from './ProductSpecifications.module.scss';

interface ProductSpecificationsProps {
  productDetail: ProductDetail;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  productDetail,
}) => {
  const rows: { label: string; value: string }[] = [
    { label: 'Brand', value: productDetail.brand },
    { label: 'Name', value: productDetail.name },
    { label: 'Description', value: productDetail.description },
    { label: 'Screen', value: productDetail.specs.screen },
    { label: 'Resolution', value: productDetail.specs.resolution },
    { label: 'Processor', value: productDetail.specs.processor },
    { label: 'Main camera', value: productDetail.specs.mainCamera },
    { label: 'Selfie camera', value: productDetail.specs.selfieCamera },
    { label: 'Battery', value: productDetail.specs.battery },
    { label: 'OS', value: productDetail.specs.os },
    {
      label: 'Screen refresh rate',
      value: productDetail.specs.screenRefreshRate,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Specifications</h2>
      <dl className={styles.list}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.description}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
