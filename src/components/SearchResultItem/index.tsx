import { Container, Image, Title, Subtitle, Content } from "./styles";

interface Props {
  title: string;
  image: string;
  subTitle?: string;
}
const SearchResultItem = ({ title, subTitle, image }: Props) => {
  return (
    <Container>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        {subTitle && <Subtitle>{subTitle}</Subtitle>}
      </Content>
    </Container>
  );
};

export default SearchResultItem;
