import { useGetExchangeRate } from '@/model/exchange';
import { useGetProduct } from '@/model/product';
import { useCartStore, useHomeStore } from '@/stores';
import { Counter, Tag, Text, XIcon, type TagType, type TextProps } from '@/ui-lib';
import { convertPrice } from '@/utils/exchangeRate';
import { Center, Flex, styled, type FlexProps } from 'styled-system/jsx';

interface ShoppingCartItemProps {
  productId: number;
}

export default function ShoppingCartItem({ productId }: ShoppingCartItemProps) {
  const currentCurrency = useHomeStore(state => state.currency);
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity, removeCartItem } = useCartStore(
    state => state
  );

  const { data: product } = useGetProduct({ productId });
  const { data: exchangeRate } = useGetExchangeRate();

  if (!product) return null;

  const cartQuantity = cartItems.find(item => item.productId === productId)?.quantity || 0;
  const isMaxQuantity = cartQuantity >= product.stock;

  return (
    <ShoppingCartItemRoot>
      <ShoppingCartItemImage src={product.images[0]} alt={product.name} />
      <ShoppingCartItemContent>
        <ShoppingCartItemInfo
          type={product.category.toLowerCase() as TagType}
          title={product.name}
          description={product.description}
          onDelete={() => removeCartItem(productId)}
        />
        <ShoppingCartItemFooter>
          <ShoppingCartItemPrice>
            {convertPrice(product.price, currentCurrency, exchangeRate?.exchangeRate)}
          </ShoppingCartItemPrice>
          <Counter.Root>
            <Counter.Minus onClick={() => decreaseCartItemQuantity(productId)} />
            <Counter.Display value={cartQuantity} />
            <Counter.Plus onClick={() => increaseCartItemQuantity(productId)} disabled={isMaxQuantity} />
          </Counter.Root>
        </ShoppingCartItemFooter>
      </ShoppingCartItemContent>
    </ShoppingCartItemRoot>
  );
}

const ShoppingCartItemRoot = ({ children, ...props }: FlexProps) => {
  return (
    <Flex gap={4} {...props}>
      {children}
    </Flex>
  );
};

const ShoppingCartItemImage = ({ src, alt }: { src: string; alt: string }) => {
  return <styled.img src={src} alt={alt} css={{ w: '60px', h: '60px', rounded: 'lg' }} />;
};

const ShoppingCartItemContent = ({ children, ...props }: FlexProps) => {
  return (
    <Flex flexDir="column" gap={2} flex={1} {...props}>
      {children}
    </Flex>
  );
};

const ShoppingCartItemInfo = ({
  type,
  title,
  description,
  onDelete,
}: {
  type: TagType;
  title: string;
  description: string;
  onDelete?: () => void;
}) => {
  return (
    <Flex flexDir="column" gap={1}>
      <Flex alignItems="center" justify="space-between">
        <Tag type={type} />
        <Center onClick={onDelete} color="neutral.03_gray" cursor="pointer">
          <XIcon size={16} />
        </Center>
      </Flex>
      <Text variant="B2_Bold">{title}</Text>
      <Text variant="C1_Medium" color="neutral.02_gray">
        {description}
      </Text>
    </Flex>
  );
};

const ShoppingCartItemPrice = ({ children, ...props }: TextProps) => {
  return (
    <Text variant="H1_Bold" {...props}>
      {children}
    </Text>
  );
};
const ShoppingCartItemFooter = ({ children, ...props }: FlexProps) => {
  return (
    <Flex alignItems="center" justify="space-between" {...props}>
      {children}
    </Flex>
  );
};
