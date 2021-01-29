import React from 'react';
import { useQuery } from '@apollo/client';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BugReport from '@material-ui/icons/BugReport';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { GET_REPO_ISSUES } from 'modules/repoCrawler/queries';
import { IssueDetails, QueryIssuesData, QueryIssuesVar } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    issuesWrapper: {
      padding: '16px 24px',
    },
    totalCount: {
      margin: '1rem 0',
      fontSize: '1rem',
    },
    contentDescription: {
      margin: '1rem 0',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    chipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
      fontWeight: 700,
      overflow: 'auto',
      margin: '1rem 0',
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IssueDialogProps {
  isOpen: boolean;
  repoName?: string;
  repoOwner?: string;
  onClose: () => void;
}

const IssueDialog: React.FC<IssueDialogProps> = ({
  isOpen,
  onClose,
  repoName,
  repoOwner,
}) => {
  const classes = useStyles();

  const { data, loading, error } = useQuery<QueryIssuesData, QueryIssuesVar>(
    GET_REPO_ISSUES,
    {
      variables: {
        name: repoName || '',
        owner: repoOwner || '',
      },
    }
  );

  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>
        {repoOwner}/{repoName}
      </DialogTitle>

      <div className={classes.issuesWrapper}>
        <div className={classes.chipWrapper}>
          <Chip
            label={`${data?.repository.issues.totalCount} issue(s)`}
            avatar={<BugReport />}
          />
        </div>
        <Typography className={classes.contentDescription}>
          Here is a quick list on the latest 20 issue reported:
        </Typography>

        {data &&
          data.repository.issues.nodes.map(
            (issue: IssueDetails, index: number) => {
              return (
                <Accordion key={`${index}-accordion`}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      {issue.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: issue.bodyHTML,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            }
          )}
      </div>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueDialog;
