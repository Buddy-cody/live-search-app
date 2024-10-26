import React, { useEffect, useState } from 'react';
import { UserService } from '../services/UserService';

const LiveUserSearch = () => {

    let [state, setState] =useState({
        searchKey : '',
        loading : false,
        users : [],
        fUsers : [],
        errorMessage : null
    });

    useEffect(()=>{
      // eslint-disable-next-line react-hooks/exhaustive-deps
      getCase();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let getCase = async () => {
        setState({...state, loading : true});
        try{
            let response = await UserService.getALLUSERS();
            let {results} = response.data;
            setState({
                ...state,
                users : results,
                fUsers : results,
                loading : false
            })
        }
        catch(error){
            setState({
                ...state,
                loading : false,
                errorMessage : error
            })
        }};

        let searchUser = (event) => {
            let filteredUsers = state.fUsers.filter(user => {
                return user.name.first.toLowerCase().includes(event.target.value.toLowerCase());
            });
            setState({...state, users: filteredUsers, searchKey: event.target.value});
        };

  return (
    <React.Fragment>
      <div className="container mt-5  ">
        <div className="row ">
          <div className="col-md-4 mx-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white  p-3">
                <p className="h4">Live User Search</p>
                <form>
                  <input
                    value={state.searchKey}
                    onChange={searchUser}
                    type="text"
                    className="form-control"
                    placeholder="Search Here.."
                  />
                </form>
              </div>
              <div className="card-body bg-light">
                <ul className="list-group">
                  {state.users.length > 0 &&
                    state.users.map((user) => {
                      return (
                        <li
                          key={user.login.uuid}
                          className="list-group-item list-group-item-primary"
                        >
                          <div className="row align-content-center">
                            <div className="col-sm-3">
                              <img
                                src={user.picture.thumbnail}
                                alt=""
                                className="img-fluid rounded-circle"
                              />
                            </div>
                            <div className="col-sm-8">
                              <p className="h5">
                                {user.name.title}. {user.name.first}{" "}
                                {user.name.last}
                              </p>
                              <small>
                                {user.location.city}, {user.location.country}
                              </small>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LiveUserSearch;