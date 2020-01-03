import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
mutation($username: String!, $password: String!){ 
 apollome: login(username:$username password:$password){username }
}
`;
export default LOGIN_MUTATION;