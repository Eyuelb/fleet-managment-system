import { Box, Group, Stack, Text } from '@mantine/core';
import CardItem from './card';
import { CardListProps } from './model';

export const CardList = (props: CardListProps) => {
  const { items, onChange, value, isSelected, selectable } = props;
  const options = items.map((item, i) => (
    <CardItem
      value={value}
      onChange={() => onChange && onChange(item)}
      key={i}
      isSelected={isSelected && isSelected(item)}
      selectable={selectable}
      data={item}
    />
  ));
  return <Box className="w-full px-0 py-4 gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">{options}</Box>;
};
