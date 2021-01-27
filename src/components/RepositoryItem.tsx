import React from 'react';
import {
  Chip,
  makeStyles,
  createStyles,
  Theme,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import PeopleIcon from '@material-ui/icons/People';
import Skeleton from '@material-ui/lab/Skeleton';
import { RepoDetails } from './RepoList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {},
    chipWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
    },
  })
);

const RepositoryItem: React.FC<{
  repo: RepoDetails;
  expanded: boolean;
  isLoading?: boolean;
}> = ({ repo = {} as RepoDetails, expanded }) => {
  const classes = useStyles();

  const {
    node: {
      name,
      description,
      createdAt,
      owner: { login, avatarUrl },
      stargazers: { totalCount: totalStarCount },
      languages: { totalCount, edges },
    },
  } = repo;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={avatarUrl}
          />
        }
        title={name}
        subheader={createdAt}
      />
      <CardContent>
        {/* <Typography variant={'caption'}>{{ description }} </Typography> */}
        <div className={classes.chipWrapper}>
          <Chip label={`by ${login}`} avatar={<PeopleIcon />} />
          <Chip label={totalStarCount} avatar={<StarIcon />} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RepositoryItem;

export const SkeletonRepositoryCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="70%"
            style={{ marginBottom: '10px' }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <CardContent>
        <div className={classes.chipWrapper}>
          <Skeleton animation="wave" height={30} width="20%" />
          <Skeleton animation="wave" height={30} width="20%" />
          <Skeleton animation="wave" height={30} width="20%" />
        </div>
      </CardContent>
    </Card>
  );
};
