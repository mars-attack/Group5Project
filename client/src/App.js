import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import VitalsList from "./components/VitalsList";
import VitalsForm from "./components/VitalsForm";
import Profile from "./components/Profile";
import VitalsResult from "./components/VitalsResult";
import MotivationalTipList from "./components/MotivationalTipList";
import Error from "./components/Error";
import AuthContext from "./contexts/Context";
import Header from "./components/partials/Header";
import AuthService from "./services/AuthService";
import ViewMotivationTip from "./components/ViewMotivationTip";
import PatientList from "./components/nurse/PatientList";
import AlertList from "./components/nurse/AlertList";
import MotivationTipForm from "./components/nurse/MotivationTipForm";
function App() {
  const [auth, setAuth] = useState({ user: null, token: null });
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  // called once on load, checks for local storage data
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("id_token");
    if (user && token) {
      setAuth({ user: JSON.parse(user), token: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Header />

        <Switch>
          <Route render={() => <Home />} exact path="/" />
          <Route render={() => <Home />} exact path="/home" />
          <Route render={(data) => <Login {...data} />} exact path="/login" />
          <Route
            render={(data) => <Register {...data} />}
            exact
            path="/register"
          />
          <Route render={(data) => <Error {...data} />} exact path="/error" />

          {/* Protected routes */}
          {AuthService.loggedIn()  && (
            <Route component={VitalsList} exact path="/vitalslist"/>
          )}

          {AuthService.loggedIn()  && (
            <Route component={MotivationalTipList} exact path="/motivation/list" />
          )}

          {AuthService.loggedIn()  && (
            <Route component={ViewMotivationTip} exact path="/motivation/view/:id" />
          )}

          {AuthService.loggedIn()  && (
            <Route component={VitalsResult} exact path="/vitals/result" />
          )}

          {AuthService.loggedIn()  && (
            <Route component={VitalsForm} exact path="/vitals/form" />
          )}

          {AuthService.loggedIn()  && (
            <Route component={Profile} exact path="/profile" />
          )}

          {/* Nurse only routes */}

          {AuthService.loggedIn() && auth.user?.userType === "nurse" && (
            <Route component={MotivationTipForm} exact path="/motivation/form" />
          )}

          {AuthService.loggedIn() && auth.user?.userType === "nurse" && (
            <Route component={PatientList} exact path="/patientlist" />
          )}

          {AuthService.loggedIn() && auth.user?.userType === "nurse" && (
            <Route component={AlertList} exact path="/alertlist" />
          )}
          <Route component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
