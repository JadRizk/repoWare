export interface UsernameData {
  viewer: {
    login: string;
  };
}

export interface RepoDetails {
  node: {
    id: string;
    name: string;
    createdAt: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
    stargazers: {
      totalCount: number;
    };
  };
}

export interface SearchRepoData {
  search: {
    repositoryCount: number;
    edges: RepoDetails[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export interface SearchRepoVars {
  cursor: string | null;
  search_term: string;
}
