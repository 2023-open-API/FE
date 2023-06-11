import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn && (
          <div>
            <NavMenu signeduser={signeduser} />
          </div>
        )}
        <Routes>
          {!isLoggedIn && (
            <Route path="/" element={<Login setLoginPage={setLoginPage} />} />
          )}
          {!isLoggedIn && (
            <Route
              path="/signup"
              element={<Signup setSignedUser={setSignedUser} />}
            />
          )}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/timetable" element={<TimeTableApp />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
>>>>>>> origin/main
  );
}
