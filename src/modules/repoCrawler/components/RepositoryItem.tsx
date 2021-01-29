import React from 'react';

import Chip from '@material-ui/core/Chip';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import StarIcon from '@material-ui/icons/Star';
import PeopleIcon from '@material-ui/icons/People';
import Skeleton from '@material-ui/lab/Skeleton';

import { RepoDetails } from 'modules/repoCrawler/types';

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
    chipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
      fontWeight: 700,
      overflow: 'auto',
    },
  })
);

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

interface RepositoryItemProps {
  repo: RepoDetails;
  expanded: boolean;
  isLoading?: boolean;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repo = {} as RepoDetails,
  expanded,
}) => {
  const classes = useStyles();

  const {
    node: {
      name,
      createdAt,
      owner: { login, avatarUrl },
      stargazers: { totalCount: totalStarCount },
    },
  } = repo;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="user" src={avatarUrl} />}
        title={name}
        subheader={createdAt}
      />
      <CardContent>
        <div className={classes.chipWrapper}>
          <Chip label={`by ${login}`} avatar={<PeopleIcon />} />
          <Chip label={totalStarCount} avatar={<StarIcon />} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RepositoryItem;
