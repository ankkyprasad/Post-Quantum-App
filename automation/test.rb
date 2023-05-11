# frozen_string_literal: true

require 'securerandom'

# backend challenge testcases
module BackendTest
  def self.run(url)
    test = TodoList.new(url)
    test.generate_result
  end

  # test for todo list rest api
  class TodoList
    def initialize(url)
      @url = url
      @uniq_username = SecureRandom.hex
      @password = SecureRandom.hex
      @auth_token = ''
      @task_id = ''
      @success = []
      @failed = []
    end

    def generate_result
      register_new_user
      should_not_create_a_new_user_if_email_is_already_registered
      should_login_user_if_correct_credentials_are_provided
      should_not_login_with_incorrect_password
      should_return_task_of_authenticated_user
      should_not_return_task_if_user_is_not_authenticated
      should_create_a_task
      should_not_create_a_task_if_user_is_not_authenticated
      should_update_the_completed
      should_not_update_the_task_if_user_is_not_authenticated
      should_not_delete_the_task_if_user_is_not_authenticated
      should_delete_the_task

      p 'here'
      p HTTParty

      {
        success: @success,
        failed: @failed,
        status: @failed.count.zero?,
        total_test_cases: @success.count + @failed.count
      }
    end

    private

    def register_new_user
      body = {
        name: @uniq_username,
        email: "#{@uniq_username}_user1@gmail.com",
        password: @password,
        confirmPassword: @password
      }
      headers = {
        'Content-Type' => 'application/json'
      }
      response = HTTParty.post("#{@url}/api/v1/users/register", body: body.to_json, headers: headers)
      message = 'should register a new user'

      if response.code == 201
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_create_a_new_user_if_email_is_already_registered
      body = {
        name: @uniq_username,
        email: "#{@uniq_username}_user1@gmail.com",
        password: @password,
        confirmPassword: @password
      }
      headers = {
        'Content-Type' => 'application/json'
      }
      response = HTTParty.post("#{@url}/api/v1/users/register", body: body.to_json, headers: headers)
      message = 'should not create a new user if email is already registered'
      if response.code == 422
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_login_user_if_correct_credentials_are_provided
      body = {
        email: "#{@uniq_username}_user1@gmail.com",
        password: @password
      }
      headers = {
        'Content-Type' => 'application/json'
      }
      response = HTTParty.post("#{@url}/api/v1/users/login", body: body.to_json, headers: headers)
      message = 'should login user if correct credentials are provided'
      if response.code == 200
        @auth_token = JSON.parse(response.body, symbolize_names: true)[:token]
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_login_with_incorrect_password
      body = {
        email: "#{@uniq_username}_user1@gmail.com",
        password: SecureRandom.hex
      }
      headers = {
        'Content-Type' => 'application/json'
      }
      response = HTTParty.post("#{@url}/api/v1/users/login", body: body.to_json, headers: headers)
      message = 'should not login with incorrect password'

      if response.code == 400
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_return_task_of_authenticated_user
      headers = {
        Authorization: "Bearer #{@auth_token}"
      }
      response = HTTParty.get("#{@url}/api/v1/tasks", headers: headers)
      message = 'should return tasks of authenticated user'

      if response.code == 200
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_return_task_if_user_is_not_authenticated
      headers = {
        Authorization: "Bearer #{SecureRandom.hex}"
      }

      response = HTTParty.get("#{@url}/api/v1/tasks", headers: headers)
      message = 'should not return tasks if user is not authenticated'

      if response.code == 401
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_create_a_task
      headers = {
        'Content-Type' => 'application/json',
        Authorization: "Bearer #{@auth_token}"
      }
      body = {
        name: 'Write RSpec for Users'
      }

      response = HTTParty.post("#{@url}/api/v1/tasks", body: body.to_json, headers: headers)
      message = 'should create a task'

      if response.code == 200
        @success << message
        @task_id = response_body[:todo][:_id]
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_create_a_task_if_user_is_not_authenticated
      headers = {
        'Content-Type' => 'application/json',
        Authorization: "Bearer #{SecureRandom.hex}"
      }
      body = {
        name: 'Write RSpec for Users'
      }
      response = HTTParty.post("#{@url}/api/v1/tasks", body: body.to_json, headers: headers)
      message = 'should not create a task when user is not authorized'

      if response.code == 401
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_update_the_completed
      headers = {
        'Content-Type': 'application/json',
        Authorization: "Bearer #{@auth_token}"
      }
      body = {
        completed: true
      }
      response = HTTParty.put("#{@url}/api/v1/tasks/#{@task_id}", body: body.to_json, headers: headers)
      message = 'should update the completed'

      if response.code == 200
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_update_the_task_if_user_is_not_authenticated
      headers = {
        'Content-Type': 'application/json'
      }
      body = {
        completed: false
      }
      response = HTTParty.put("#{@url}/api/v1/tasks/#{@task_id}", body: body.to_json, headers: headers)
      message = 'should not update the task if user is not authenticated'

      if response.code == 401
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_not_delete_the_task_if_user_is_not_authenticated
      response = HTTParty.delete("#{@url}/api/v1/tasks/#{@task_id}")
      message = 'should not delete the task if user is not authenticated'
      if response.code == 401
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end

    def should_delete_the_task
      headers = {
        Authorization: "Bearer #{@auth_token}"
      }
      response = HTTParty.delete("#{@url}/api/v1/tasks/#{@task_id}", headers: headers)
      message = 'should delete the task'
      if response.code == 200
        @success << message
      else
        @failed << message
      end
    rescue StandardError
      @failed << message
    end
  end
end

data = BackendTest.run('http://localhost:5000')
p data
