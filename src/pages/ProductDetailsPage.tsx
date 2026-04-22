import { useParams } from 'react-router-dom';
import { ProductDetails } from '../widgets/ui/ProductDetails';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return <ProductDetails id={id} />;
};
