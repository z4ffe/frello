import compose from 'compose-function'
import {withQuery} from './withQuery.tsx'
import {withStore} from './withRedux.tsx'
import {withRouter} from './withRouter.tsx'

export const withProviders = compose(withStore, withQuery, withRouter)
