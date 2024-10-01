import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://eu-west-2.cdn.hygraph.com/v2/cm1qcf98g00kq08wbjb632q0o/master";

const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
};
