import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './components/views/Home'
import Backup from './components/views/Backup'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/backup' component={Backup} />
        <Redirect from='*' to='/' />
    </Switch>