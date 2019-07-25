import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from '../components/layout/layout';
import Login from '../components/login';
import RegisterClient from '../components/registerClient'; 
import Dashboard from '../components/dashboard/dashboard';
import Quizes from '../components/makeQuiz/makeQuizes';
import Question from '../components/questionsBank/questions';
import AddQuestion from '../components/questionsBank/addQuestion';
import AddQuiz from '../components/makeQuiz/addQuiz';
import EditQuiz from '../components/makeQuiz/editQuiz';

const App = (props) => (
  <div className="quiz">
    <Layout>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={ RegisterClient } />
      <Dashboard>
        <Route exact path="/quizes" component={Quizes} />
        <Route path="/addQuiz" component={AddQuiz}/>
        <Route path="/editQuiz" render={(props) => <EditQuiz {...props} />}/> 
        <Route path="/question" component={Question}/>               
        <Route path="/logout" render={(props) => 
                  <Redirect to="/"/>
                 }/>
      </Dashboard>

      </Switch>        
    </Layout>

  </div>
  )

export default App;