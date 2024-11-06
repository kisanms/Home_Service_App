import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://eu-west-2.cdn.hygraph.com/v2/cm1qcf98g00kq08wbjb632q0o/master";
const getCategories = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
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
const getBusinessList = async () => {
  const query = gql`
    query getBusinessList {
      businessLists {
        id
        name
        rate
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query getBusinessList {
  businessLists(where: {category: {name: "` +
    category +
    `"}}) {
    id
    name
    rate
    email
    contactPerson
    category {
      name
    }
    address
    about
    images {
      url
    }
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked
          businessList: { connect: { id: "` +
    data.businessId +
    `" } }
          date: "` +
    data.date +
    `"
          time: "` +
    data.time +
    `"
          userEmail: "` +
    data.userEmail +
    `"
          userName: "` +
    data.userName +
    `"
        }
      ) {
        id
      }
       publishManyBookings(to: PUBLISHED) {
    count
  }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const cancelBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation cancelBooking {
  updateBooking(
    where: {id: "`+data+`"},
    data: {bookingStatus: Cancelled}) {
    id
  }
    publishManyBookings(to: PUBLISHED) {
    count
  }
}
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBookings = async (userEmail) => {
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: updatedAt_DESC, where: { userEmail: "` +
    userEmail +
    `" }) {
        time
        userEmail
        userName
        bookingStatus
        date
        id
        businessList {
          id
          images {
            url
          }
          name
          address
          contactPerson
          email
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const submitFeedback = async (feedbackData) => {
  // Mutation to create feedback
  const createFeedbackMutation = gql`
    mutation SubmitFeedback(
      $rating: Int!
      $note: String!
      $bookingId: ID!
      $userId: String
      $userEmail: String!
    ) {
      createFeedback(
        data: {
          rating: $rating
          note: $note
          booking: { connect: { id: $bookingId } }
          userId: $userId
          userEmail: $userEmail
        }
      ) {
        id
        rating
        note
        userEmail
      }
    }
  `;

  const variables = {
    rating: feedbackData.rating,
    note: feedbackData.note,
    bookingId: feedbackData.bookingId,
    userId: feedbackData.userId,
    userEmail: feedbackData.userEmail,
  };

  try {
    // Create feedback first
    const createResult = await request(
      MASTER_URL,
      createFeedbackMutation,
      variables
    );

    const feedbackId = createResult.createFeedback.id;

    // Mutation to publish feedback
    const publishFeedbackMutation = gql`
      mutation PublishFeedback($id: ID!) {
        publishFeedback(where: { id: $id }, to: PUBLISHED) {
          id
          stage
        }
      }
    `;

    // Publish the created feedback
    const publishVariables = { id: feedbackId };
    const publishResult = await request(
      MASTER_URL,
      publishFeedbackMutation,
      publishVariables
    );

    return publishResult;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw new Error("Failed to submit feedback");
  }
};

const createBusinessList = async (data) => {
  const mutationQuery = gql`
    mutation CreateBusinessList(
      $name: String!
      $contactPerson: String!
      $address: String!
      $about: String!
      $email: String!
    ) {
      createBusinessList(
        data: {
          name: $name
          contactPerson: $contactPerson
          address: $address
          about: $about
          email: $email
        }
      ) {
        id
        name
        contactPerson
        address
        about
        email
      }
    }
  `;

  const variables = {
    name: data.name,
    contactPerson: data.contactPerson,
    address: data.address,
    about: data.about,
    email: data.email,
  };

  try {
    const result = await request(MASTER_URL, mutationQuery, variables);
    return result;
  } catch (error) {
    console.error("Error creating business list:", error);
    throw new Error("Failed to create business list");
  }
};

const getEmployeeBookings = async ({ id }) => {
  const response = await request(
    MASTER_URL,
    gql`
      query GetEmployeeBookings {
        bookings(orderBy: updatedAt_DESC, where: { businessList: { id: "${id}" } }) {
          time
          userEmail
          userName
          bookingStatus
          date
          id
          businessList {
            id
            name
            address
            contactPerson
            email
            about
          }
        }
      }
    `
  );
  return response;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings,
  submitFeedback,
  createBusinessList,
  getEmployeeBookings,
  cancelBooking
};
