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

export interface IssueDetails {
  title: string;
  bodyHTML: string;
  createdAt: string;
}

export interface QueryIssuesData {
  repository: {
    issues: {
      totalCount: number;
      nodes: IssueDetails[];
    };
  };
}

export interface QueryIssuesVar {
  name: string;
  owner: string;
}
