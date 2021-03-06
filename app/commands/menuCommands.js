import * as api from '../api';
import store from '../store';
import * as ModalActions from '../components/Modal/actions';
import * as GitActions from '../components/Git/actions';
import * as TabActions from '../components/Tab/actions';
import { bindActionCreators } from 'redux';
const {getState, dispatch} = store;

const [Modal, Git, Tab] = [
  ModalActions,
  GitActions,
  TabActions
].map( Actions => bindActionCreators(Actions, dispatch) );

export default {
  // 'app:settings':
  // 'file:new_file'

  'file:save': (c) => {
    var activeTab = getState().TabState.activeGroup.activeTab;
    var content = activeTab.editor.getValue();
    api.writeFile(activeTab.path, content);
  },

  'git:commit': (c) => {
    api.gitStatus().then( ({files, clean}) => {
      Git.updateStatus({files, isClean: clean})
    }).then( () =>
      Modal.showModal({modalType: 'GitCommit', content: 'HelloYo'})
    )
  },

  'modal:dismiss': (c) => {
    Modal.dismissModal()
  },
  // 'file:delete':
  // 'file:unsaved_files_list':
  // 'view:close_tab':
  // 'view:toggle_statusbar':
  // 'view:toggle_filetree':

  // 'tools:terminal:clear_buffer':
  // 'tools:terminal:clear_scrollback_buffer':
  // 'tools:terminal:reset':
  'tools:terminal:new_terminal': (c) => {

  },

  // 'git:commit_and_push':
  'git:pull': (c) => {
    Git.pull()
  },

  'git:push': (c) => {
    Git.push()
  },

  // 'git:branch':
  // 'git:tag':
  // 'git:merge':
  // 'git:resolve_conflicts':
  // 'git:stash':
  // 'git:unstash'<:></:>
  // 'git:reset_head':
  // 'git:rebase:start':
  // 'git:rebase:abort':
  // 'git:rebase:continue':
  // 'git:rebase:skip_commit':
}
