import { Link, useLocation } from 'react-router-dom'
import NavBarButton from './NavBarButton'
import React, { memo, useMemo } from 'react'
import SearchInput from '../../ui/input/SearchInput'
import PenIcon from '../../ui/icon/PenIcon'
import BellIcon from '../../ui/icon/BellIcon'
import UserIcon from '../../ui/icon/UserIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const NavBar = memo(() => {
  const { pathname } = useLocation()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )

  const userIcon = useMemo(
    () => (
      <UserIcon
        color="#6B6B6B"
        className={`w-6 h-6 ${
          pathname.startsWith('/user-info') && 'fill-[#242424]'
        }`}
        profileImageUrl={user?.profileImageUrl}
      />
    ),
    [pathname, user?.profileImageUrl]
  )

  return (
    <nav className="relative bg-white border-b overflow-hidden px-[24px]">
      <Link to="/" className="float-left">
        <div className="font-extrabold text-[40px]">Inpogram</div>
      </Link>
      {isAuthenticated ? (
        <>
          <div className="absolute float-none top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px]">
            <SearchInput value="" className="" />
          </div>
          <div className="float-right translate-y-[50%]">
            <div className="flex gap-2 pl-4 float-right">
              <NavBarButton
                key={'add-post'}
                link={'/posts/add'}
                isSelected={pathname.startsWith('/posts/add')}
                title={'Add post'}
                icon={
                  <PenIcon
                    color="#6B6B6B"
                    className={`w-6 h-6 ${
                      pathname.startsWith('/posts/add') && 'fill-[#242424]'
                    }`}
                  />
                }
              />

              <NavBarButton
                key={'noti'}
                link={'/posts/add'}
                isSelected={pathname.startsWith('/posts/add')}
                icon={
                  <BellIcon
                    color="#6B6B6B"
                    className={`w-6 h-6 ${
                      pathname.startsWith('/noti') && 'fill-[#242424]'
                    }`}
                  />
                }
              />

              <NavBarButton
                key={'user'}
                link={'/posts/add'}
                isSelected={pathname.startsWith('/posts/add')}
                icon={userIcon}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="float-right translate-y-[75%]">
          <div className="flex gap-6 pl-4 float-right ">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  )
})

export default NavBar
