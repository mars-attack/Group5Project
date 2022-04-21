import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <VitalsList {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            exact
            path="/vitalslist"
          />

          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <MotivationalTipList {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            exact
            path="/motivation/list"
          />

          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <ViewMotivationTip {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            path="/motivation/view/:id"
          />

          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <VitalsResult {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            exact
            path="/vitals/result"
          />

          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <VitalsForm {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            exact
            path="/vitals/form"
          />

          <Route
            render={(data) => {
              return AuthService.loggedIn() ? (
                <Profile {...data} />
              ) : (
                <Redirect to={{ pathname: "/" }} />
              );
            }}
            exact
            path="/profile"
          />


          {/* Nurse only routes */}
          <Route
            render={(data) => {
              return AuthService.loggedIn() &&
                auth.user?.userType === "nurse" ? (
                <PatientList {...data} />
              ) : (
                <Redirect to={{ pathname: "/home" }} />
              );
            }}
            exact
            path="/patientlist"
          />
          <Route
            render={(data) => {
              return AuthService.loggedIn() &&
                auth.user?.userType === "nurse" ? (
                <AlertList {...data} />
              ) : (
                <Redirect to={{ pathname: "/home" }} />
              );
            }}
            exact
            path="/alertlist"
          />
          <Route
            render={(data) => {
              return AuthService.loggedIn() &&
                auth.user?.userType === "nurse" ? (
                <MotivationTipForm {...data} />
              ) : (
                <Redirect to={{ pathname: "/home" }} />
              );
            }}
            exact
            path="/motivation/form"
          />

          <Route component={Error} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
