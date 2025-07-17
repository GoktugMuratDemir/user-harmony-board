import styled from "styled-components";
import Colors from "../../Styles/Colors";

const HomeBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${Colors.primary[100]},
    ${Colors.surface} 80%
  );
`;

const HomeCard = styled.div`
  background: ${Colors.surface};
  box-shadow: 0 8px 40px 0 ${Colors.primary[200]};
  min-width: 340px;
  max-width: 1100px;
  border-radius: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 38px 32px 32px 32px;
  border: 1.5px solid ${Colors.border};
  margin-bottom: 24px;
`;

const HomeIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    ${Colors.primary[400]},
    ${Colors.secondary[400]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  font-weight: 900;
  color: ${Colors.textLight};
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 ${Colors.primary[200]};
`;

const HomeTitle = styled.h2`
  color: ${Colors.primary[600]};
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-align: left;
  width: 100%;
`;

const HomeDesc = styled.p`
  color: ${Colors.text};
  font-size: 1.08rem;
  margin-bottom: 24px;
  width: 100%;
  text-align: left;
`;

const Home = () => {
  return (
    <HomeBg>
      <HomeCard>
        <HomeIcon>🏠</HomeIcon>
        <HomeTitle>Hoşgeldiniz!</HomeTitle>
        <HomeDesc>
          Burası modern ve kullanıcı dostu bir ana sayfadır. Sol menüden
          kullanıcı listesine veya diğer sayfalara geçiş yapabilirsiniz.
        </HomeDesc>
      </HomeCard>
    </HomeBg>
  );
};

export default Home;
