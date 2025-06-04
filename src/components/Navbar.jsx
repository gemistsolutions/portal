import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  console.log(user)
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <NavLink to="/" className="text-primary font-semibold text-xl">
            Gemist Compliance
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-primary'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-primary'
            }
          >
            Documents
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-primary'
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-primary'
            }
          >
            Support
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-primary'
            }
          >
            Resources
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {/* Profile dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-full px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span className="uppercase text-sm">{user.email.charAt(0)}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                <div className="px-2 py-2 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/profile')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full px-2 py-1 text-left text-gray-700`}
                      >
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-2 py-2 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/profile/notifications')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full px-2 py-1 text-left text-gray-700`}
                      >
                        Notifications
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-2 py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full px-2 py-1 text-left text-gray-700`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
