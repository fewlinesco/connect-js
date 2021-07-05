changed_folder_names=$(git diff --no-commit-id --name-only -r `git log -n 2 --oneline --pretty=format:"%h" | tail -n1` | cut -d/ -f1 | sort -u)
package_names="client management popup"

for name in $changed_folder_names
do 
  if [[ $package_names =~ (^|[[:space:]])"$name"($|[[:space:]]) ]] ; then
    echo "this is $name"
    data="{ \"branch\": \"$CIRCLE_BRANCH\", \"parameters\": { \"$name\": true, \"trigger\": false } }"

    echo $data
    curl -X POST -u "${CIRCLE_CI_TOKEN}:" --header 'content-type: application/json' -d "$data" https://circleci.com/api/v2/project/github/fewlinesco/connect-js/pipeline
  fi
done
